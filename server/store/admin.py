#!/usr/bin/python
#
# Copyright 2025 LearnChef3000


from django.contrib import admin
from django.utils.html import format_html

from store.models import Product, SiteConfig, Testimonial, Transaction


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "description",
        "price",
        "discount",
        "inventory_count",
        "active",
    )

    # Display preview of image in admin
    @admin.display(description="Product Image Preview")
    def image_tag(self, obj):
        return format_html('<img src="{}" style="width: 200px"/>'.format(obj.image.url))

    readonly_fields = ["image_tag"]

    # Formatted discount display for admin list
    def discount(self, obj):
        return f"{obj.discount_percent}%"


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ("datetime", "product_id")


@admin.register(Testimonial)
class TransactionAdmin(admin.ModelAdmin):
    list_display = (
        "product_id",
        "reviewer_name",
        "reviewer_location",
        "rating",
        "summary",
    )


@admin.register(SiteConfig)
class SiteConfigAdmin(admin.ModelAdmin):
    list_display = ("site_name", "active")
    fieldsets = (
        (None, {"fields": ("active", "base_font")}),
        ("Site Header", {"fields": ("site_name", "site_name_color", "site_name_font")}),
        (
            "Colors",
            {
                "fields": (
                    "color_primary",
                    "color_secondary",
                    "color_action",
                    "color_action_text",
                )
            },
        ),
    )
