from django.contrib import admin
from django.core.exceptions import ValidationError
from .models import Category, Product


class ProductAdmin(admin.ModelAdmin):
    actions = ['delete_selected_products']

    def get_actions(self, request):
        actions = super().get_actions(request)
        if 'delete_selected' in actions:
            del actions['delete_selected']  # удаляем стандартный delete
        return actions

    def delete_selected_products(self, request, queryset):
        active_products = queryset.filter(is_active=True)

        if active_products.exists():
            raise ValidationError("Нельзя удалить активное говно. Сначала деактивируйте их.")

        queryset.delete()

    delete_selected_products.short_description = "Delete selected products"


admin.site.register(Category)
admin.site.register(Product, ProductAdmin)