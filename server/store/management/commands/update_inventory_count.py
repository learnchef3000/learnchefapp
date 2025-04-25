#!/usr/bin/python
#
# Copyright 2025 LearnChef3000


from django.core.management.base import BaseCommand, CommandParser

from store.models import Product


class Command(BaseCommand):
    help = "Updates the inventory count for the active product. "

    def add_arguments(self, parser: CommandParser) -> None:
        parser.add_argument("--add", type=int)

    def handle(self, *args, **options):
        add = options["add"] or 10
        product = Product.objects.filter(active=True).last()
        product.inventory_count += add
        product.save()
