"use client";

import React from 'react';
import APIDocumentation from './APIDocumentation';
import { TypewriterEffectSmooth } from '../ui/typewriter-effect';

const ShoppingCartAPIExample: React.FC = () => {
  const typewriterWords = [
    {
      text: "Shopping",
    },
    {
      text: "Cart",
    },
    {
      text: "API",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  const cartEndpoints = [
    {
      method: 'GET' as const,
      path: '/cart',
      description: 'Retrieve current user\'s shopping cart with all items',
      responseExample: {
        "cart_id": "cart_abc123",
        "user_id": "user_456",
        "items": [
          {
            "product_id": "prod_123",
            "name": "iPhone Case",
            "price": 29.99,
            "quantity": 2,
            "subtotal": 59.98,
            "image_url": "https://example.com/iphone-case.jpg"
          },
          {
            "product_id": "prod_456",
            "name": "Wireless Charger",
            "price": 45.00,
            "quantity": 1,
            "subtotal": 45.00,
            "image_url": "https://example.com/wireless-charger.jpg"
          }
        ],
        "total_items": 3,
        "total_price": 104.98,
        "currency": "USD",
        "updated_at": "2023-09-16T10:30:00Z"
      },
      requestExample: {
        "headers": {
          "Authorization": "Bearer your-api-token",
          "Content-Type": "application/json"
        }
      }
    },
    {
      method: 'POST' as const,
      path: '/cart/items',
      description: 'Add a new item to the shopping cart',
      requestExample: {
        "product_id": "prod_789",
        "quantity": 1,
        "variant_id": "var_blue_large",
        "custom_attributes": {
          "color": "blue",
          "size": "large"
        }
      },
      responseExample: {
        "message": "Item added to cart successfully",
        "cart_item": {
          "product_id": "prod_789",
          "name": "Bluetooth Headphones",
          "price": 79.99,
          "quantity": 1,
          "subtotal": 79.99,
          "variant": {
            "color": "blue",
            "size": "large"
          }
        },
        "cart_total": 184.97,
        "total_items": 4
      }
    },
    {
      method: 'PUT' as const,
      path: '/cart/items/{product_id}',
      description: 'Update quantity of an existing cart item',
      requestExample: {
        "quantity": 3,
        "variant_id": "var_blue_large"
      },
      responseExample: {
        "message": "Cart item updated successfully",
        "cart_item": {
          "product_id": "prod_123",
          "name": "iPhone Case",
          "price": 29.99,
          "quantity": 3,
          "subtotal": 89.97,
          "updated_at": "2023-09-16T11:00:00Z"
        },
        "cart_total": 214.96,
        "total_items": 5
      }
    },
    {
      method: 'DELETE' as const,
      path: '/cart/items/{product_id}',
      description: 'Remove a specific item from the shopping cart',
      responseExample: {
        "message": "Item removed from cart successfully",
        "removed_item": {
          "product_id": "prod_456",
          "name": "Wireless Charger",
          "quantity": 1
        },
        "cart_total": 169.96,
        "total_items": 4
      }
    },
    {
      method: 'POST' as const,
      path: '/cart/clear',
      description: 'Clear all items from the shopping cart',
      responseExample: {
        "message": "Cart cleared successfully",
        "cart_id": "cart_abc123",
        "total_items": 0,
        "total_price": 0.00,
        "cleared_at": "2023-09-16T12:00:00Z"
      }
    },
    {
      method: 'POST' as const,
      path: '/cart/save',
      description: 'Save cart for later (wishlist functionality)',
      requestExample: {
        "save_for_later": true,
        "list_name": "Holiday Shopping"
      },
      responseExample: {
        "message": "Cart saved successfully",
        "saved_list_id": "list_xyz789",
        "list_name": "Holiday Shopping",
        "items_count": 4,
        "saved_at": "2023-09-16T12:30:00Z"
      }
    }
  ];

  return (
    <div className="w-full">
      <div className="mb-8">
        <div className="text-center mb-4">
          <TypewriterEffectSmooth
            words={typewriterWords}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl"
          />
        </div>
      </div>

      <APIDocumentation endpoints={cartEndpoints} />
    </div>
  );
};

export default ShoppingCartAPIExample; 