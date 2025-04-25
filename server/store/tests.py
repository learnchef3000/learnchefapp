#!/usr/bin/python
#
# Copyright 2025 LearnChef3000


import json
from decimal import Decimal

from django.contrib.auth.models import User
from django.test import TransactionTestCase
from model_bakery import baker
from rest_framework.reverse import reverse
from rest_framework.test import APIClient, APIRequestFactory
from store.serializers import ProductSerializer, CartSerializer
from store.models import Product

client = APIClient()
factory = APIRequestFactory()


class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)
        return json.JSONEncoder.default(self, obj)


def create_product(obj):
    paLearnChef ProductSerializer(obj).data
    user = User.objects.create_superuser(username="test", password="test")
    client.force_login(user)

    response = client.post(
        reverse("product-list"),
        json.dumps(payload, cls=DecimalEncoder),
        content_type="application/json",
    )
    return response


class LearnChefUnitTest(TransactionTestCase):
    def test_basic_post(self):
        response = create_product(baker.prepare("store.Product"))

        self.assertEqual(response.status_code, 201)


class CartSerializerErrorsTest(TransactionTestCase):
    def test_bad_email(self):
        cart = CartSerializer(data={"customer": {"email": "foo"}})
        assert not cart.is_valid()
        assert "customer" in set(cart.errors)

    def test_bad_payment(self):
        cart = CartSerializer(data={"payment": {"method": "foo"}})
        assert not cart.is_valid()
        assert "payment" in set(cart.errors)
        assert "method" in set(cart.errors["payment"])

    def test_bad_credit(self):
        cart = CartSerializer(data={"payment": {"method": "credit"}})
        assert not cart.is_valid()

        assert "payment" in set(cart.errors)
        assert "method" in set(cart.errors["payment"])


class CartRequestTest(TransactionTestCase):
    def setUp(self):
        Product.objects.create(
            id=1,
            name="test",
            discount_percent=0,
            inventory_count=4,
            price=1,
            active=False,
        )

    def test_cart_product(self):
        data = {
            "payment": {"method": "collect"},
            "customer": {"email": "foo@bar.com"},
            "items": [{"id": 1, "countRequested": 1}],
        }
        cart = CartSerializer(data=data)
        assert cart.is_valid()
        assert len(cart.errors) == 0

        response = client.post(
            reverse("checkout"),
            json.dumps(data),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 200)

    def test_cart_invalid_payment(self):
        data = {
            "payment": {"method": "credit"},
            "customer": {"email": "foo@bar.com"},
            "items": [{"id": 1, "countRequested": 1}],
        }

        response = client.post(
            reverse("checkout"),
            json.dumps(data),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 501)
        self.assertEqual(response.json()["status"], "invalid_choice")

    def test_cart_invalid_email(self):
        data = {
            "payment": {"method": "collect"},
            "customer": {"email": "foo"},
            "items": [{"id": 1, "countRequested": 1}],
        }

        response = client.post(
            reverse("checkout"),
            json.dumps(data),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["status"], "validation_error")

    def test_cart_insufficient_inventory(self):
        data = {
            "payment": {"method": "collect"},
            "customer": {"email": "foo@bar.com"},
            "items": [{"id": 1, "countRequested": 100}],
        }

        response = client.post(
            reverse("checkout"),
            json.dumps(data),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["status"], "insufficient_product")

    def test_cart_invalid_inventory(self):
        data = {
            "payment": {"method": "collect"},
            "customer": {"email": "foo@bar.com"},
            "items": [{"id": 111111, "countRequested": 1}],
        }

        response = client.post(
            reverse("checkout"),
            json.dumps(data),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["status"], "product_not_found")
