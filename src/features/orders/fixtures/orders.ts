import type { Order } from "@/types/order";

export const ORDERS_DATASET_REFERENCE_DATE = "2026-08-28T23:59:59.999Z";

export const orderFixtures: Order[] = [
  {
    "id": "order_1090",
    "number": "ORD-1090",
    "customer": {
      "id": "customer_001",
      "name": "Olivia Martin",
      "email": "olivia.martin@example.com"
    },
    "createdAt": "2026-08-28T14:30:00.000Z",
    "status": "delivered",
    "subtotal": 75,
    "shipping": 0,
    "tax": 5.44,
    "discount": 7.5,
    "total": 72.94,
    "items": [
      {
        "id": "item_1090_1",
        "productId": "prod_backpack",
        "productName": "Everyday Carry Backpack",
        "sku": "BAG-EC-001",
        "quantity": 1,
        "unitPrice": 75,
        "total": 75
      }
    ],
    "paymentMethod": "Visa ending in 4242",
    "shippingAddress": {
      "recipient": "Olivia Martin",
      "line1": "120 Oak Street",
      "line2": "Apt 2",
      "city": "Austin",
      "state": "TX",
      "postalCode": "78701",
      "country": "United States"
    }
  },
  {
    "id": "order_1089",
    "number": "ORD-1089",
    "customer": {
      "id": "customer_008",
      "name": "Lucas Moore",
      "email": "lucas.moore@example.com"
    },
    "createdAt": "2026-08-27T14:30:00.000Z",
    "status": "pending",
    "subtotal": 645,
    "shipping": 5.99,
    "tax": 46.76,
    "discount": 0,
    "total": 697.75,
    "items": [
      {
        "id": "item_1089_1",
        "productId": "prod_headphones",
        "productName": "Studio Wireless Headphones",
        "sku": "ELC-SW-220",
        "quantity": 2,
        "unitPrice": 121.5,
        "total": 243
      },
      {
        "id": "item_1089_2",
        "productId": "prod_keyboard",
        "productName": "Compact Mechanical Keyboard",
        "sku": "ELC-CM-087",
        "quantity": 3,
        "unitPrice": 134,
        "total": 402
      }
    ],
    "paymentMethod": "Mastercard ending in 8821",
    "shippingAddress": {
      "recipient": "Lucas Moore",
      "line1": "121 Maple Avenue",
      "city": "San Diego",
      "state": "CA",
      "postalCode": "92101",
      "country": "United States"
    }
  },
  {
    "id": "order_1088",
    "number": "ORD-1088",
    "customer": {
      "id": "customer_015",
      "name": "Evelyn Hall",
      "email": "evelyn.hall@example.com"
    },
    "createdAt": "2026-08-26T14:30:00.000Z",
    "status": "processing",
    "subtotal": 583.5,
    "shipping": 8.5,
    "tax": 42.3,
    "discount": 0,
    "total": 634.3,
    "items": [
      {
        "id": "item_1088_1",
        "productId": "prod_sneakers",
        "productName": "Cloudstep Sneakers",
        "sku": "FTW-CS-108",
        "quantity": 3,
        "unitPrice": 103,
        "total": 309
      },
      {
        "id": "item_1088_2",
        "productId": "prod_tote",
        "productName": "Canvas Market Tote",
        "sku": "ACC-CM-025",
        "quantity": 1,
        "unitPrice": 36.5,
        "total": 36.5
      },
      {
        "id": "item_1088_3",
        "productId": "prod_headphones",
        "productName": "Studio Wireless Headphones",
        "sku": "ELC-SW-220",
        "quantity": 2,
        "unitPrice": 119,
        "total": 238
      }
    ],
    "paymentMethod": "PayPal",
    "shippingAddress": {
      "recipient": "Evelyn Hall",
      "line1": "122 Cedar Lane",
      "city": "Chicago",
      "state": "IL",
      "postalCode": "60601",
      "country": "United States"
    }
  },
  {
    "id": "order_1087",
    "number": "ORD-1087",
    "customer": {
      "id": "customer_022",
      "name": "Jack Adams",
      "email": "jack.adams@example.com"
    },
    "createdAt": "2026-08-25T14:30:00.000Z",
    "status": "shipped",
    "subtotal": 55.5,
    "shipping": 12,
    "tax": 4.02,
    "discount": 0,
    "total": 71.52,
    "items": [
      {
        "id": "item_1087_1",
        "productId": "prod_wallet",
        "productName": "Slim Leather Wallet",
        "sku": "ACC-SL-033",
        "quantity": 1,
        "unitPrice": 55.5,
        "total": 55.5
      }
    ],
    "paymentMethod": "Visa ending in 1846",
    "shippingAddress": {
      "recipient": "Jack Adams",
      "line1": "123 Pine Road",
      "city": "Portland",
      "state": "OR",
      "postalCode": "97205",
      "country": "United States"
    }
  },
  {
    "id": "order_1086",
    "number": "ORD-1086",
    "customer": {
      "id": "customer_029",
      "name": "Layla Phillips",
      "email": "layla.phillips@example.com"
    },
    "createdAt": "2026-08-24T14:30:00.000Z",
    "status": "delivered",
    "subtotal": 537.5,
    "shipping": 0,
    "tax": 38.97,
    "discount": 0,
    "total": 576.47,
    "items": [
      {
        "id": "item_1086_1",
        "productId": "prod_jacket",
        "productName": "Lightweight Field Jacket",
        "sku": "APP-LF-061",
        "quantity": 2,
        "unitPrice": 145,
        "total": 290
      },
      {
        "id": "item_1086_2",
        "productId": "prod_sweater",
        "productName": "Merino Crew Sweater",
        "sku": "APP-MC-014",
        "quantity": 3,
        "unitPrice": 82.5,
        "total": 247.5
      }
    ],
    "paymentMethod": "American Express ending in 1005",
    "shippingAddress": {
      "recipient": "Layla Phillips",
      "line1": "124 Oak Street",
      "city": "Raleigh",
      "state": "NC",
      "postalCode": "27601",
      "country": "United States"
    }
  },
  {
    "id": "order_1085",
    "number": "ORD-1085",
    "customer": {
      "id": "customer_006",
      "name": "Liam Wilson",
      "email": "liam.wilson@example.com"
    },
    "createdAt": "2026-08-23T14:30:00.000Z",
    "status": "delivered",
    "subtotal": 448.5,
    "shipping": 5.99,
    "tax": 32.52,
    "discount": 15,
    "total": 472.01,
    "items": [
      {
        "id": "item_1085_1",
        "productId": "prod_mug",
        "productName": "Ceramic Travel Mug",
        "sku": "HOM-CT-052",
        "quantity": 3,
        "unitPrice": 34.5,
        "total": 103.5
      },
      {
        "id": "item_1085_2",
        "productId": "prod_bottle",
        "productName": "Insulated Travel Bottle",
        "sku": "HOM-IT-042",
        "quantity": 1,
        "unitPrice": 40,
        "total": 40
      },
      {
        "id": "item_1085_3",
        "productId": "prod_jacket",
        "productName": "Lightweight Field Jacket",
        "sku": "APP-LF-061",
        "quantity": 2,
        "unitPrice": 152.5,
        "total": 305
      }
    ],
    "paymentMethod": "Visa ending in 4242",
    "shippingAddress": {
      "recipient": "Liam Wilson",
      "line1": "125 Maple Avenue",
      "city": "Boston",
      "state": "MA",
      "postalCode": "02108",
      "country": "United States"
    }
  },
  {
    "id": "order_1084",
    "number": "ORD-1084",
    "customer": {
      "id": "customer_013",
      "name": "Harper Walker",
      "email": "harper.walker@example.com"
    },
    "createdAt": "2026-08-22T14:30:00.000Z",
    "status": "processing",
    "subtotal": 80,
    "shipping": 8.5,
    "tax": 5.8,
    "discount": 0,
    "total": 94.3,
    "items": [
      {
        "id": "item_1084_1",
        "productId": "prod_backpack",
        "productName": "Everyday Carry Backpack",
        "sku": "BAG-EC-001",
        "quantity": 1,
        "unitPrice": 80,
        "total": 80
      }
    ],
    "paymentMethod": "Mastercard ending in 8821",
    "shippingAddress": {
      "recipient": "Harper Walker",
      "line1": "126 Cedar Lane",
      "line2": "Apt 8",
      "city": "Denver",
      "state": "CO",
      "postalCode": "80202",
      "country": "United States"
    }
  },
  {
    "id": "order_1083",
    "number": "ORD-1083",
    "customer": {
      "id": "customer_020",
      "name": "Daniel Green",
      "email": "daniel.green@example.com"
    },
    "createdAt": "2026-08-21T14:30:00.000Z",
    "status": "shipped",
    "subtotal": 640,
    "shipping": 12,
    "tax": 46.4,
    "discount": 0,
    "total": 698.4,
    "items": [
      {
        "id": "item_1083_1",
        "productId": "prod_headphones",
        "productName": "Studio Wireless Headphones",
        "sku": "ELC-SW-220",
        "quantity": 2,
        "unitPrice": 126.5,
        "total": 253
      },
      {
        "id": "item_1083_2",
        "productId": "prod_keyboard",
        "productName": "Compact Mechanical Keyboard",
        "sku": "ELC-CM-087",
        "quantity": 3,
        "unitPrice": 129,
        "total": 387
      }
    ],
    "paymentMethod": "PayPal",
    "shippingAddress": {
      "recipient": "Daniel Green",
      "line1": "127 Pine Road",
      "city": "Brooklyn",
      "state": "NY",
      "postalCode": "11201",
      "country": "United States"
    }
  },
  {
    "id": "order_1082",
    "number": "ORD-1082",
    "customer": {
      "id": "customer_027",
      "name": "Chloe Roberts",
      "email": "chloe.roberts@example.com"
    },
    "createdAt": "2026-08-20T14:30:00.000Z",
    "status": "cancelled",
    "subtotal": 573.5,
    "shipping": 0,
    "tax": 41.58,
    "discount": 0,
    "total": 615.08,
    "items": [
      {
        "id": "item_1082_1",
        "productId": "prod_sneakers",
        "productName": "Cloudstep Sneakers",
        "sku": "FTW-CS-108",
        "quantity": 3,
        "unitPrice": 98,
        "total": 294
      },
      {
        "id": "item_1082_2",
        "productId": "prod_tote",
        "productName": "Canvas Market Tote",
        "sku": "ACC-CM-025",
        "quantity": 1,
        "unitPrice": 31.5,
        "total": 31.5
      },
      {
        "id": "item_1082_3",
        "productId": "prod_headphones",
        "productName": "Studio Wireless Headphones",
        "sku": "ELC-SW-220",
        "quantity": 2,
        "unitPrice": 124,
        "total": 248
      }
    ],
    "paymentMethod": "Visa ending in 1846",
    "shippingAddress": {
      "recipient": "Chloe Roberts",
      "line1": "128 Oak Street",
      "city": "Nashville",
      "state": "TN",
      "postalCode": "37201",
      "country": "United States"
    }
  },
  {
    "id": "order_1081",
    "number": "ORD-1081",
    "customer": {
      "id": "customer_004",
      "name": "Noah Davis",
      "email": "noah.davis@example.com"
    },
    "createdAt": "2026-08-19T14:30:00.000Z",
    "status": "delivered",
    "subtotal": 50.5,
    "shipping": 5.99,
    "tax": 3.66,
    "discount": 0,
    "total": 60.15,
    "items": [
      {
        "id": "item_1081_1",
        "productId": "prod_wallet",
        "productName": "Slim Leather Wallet",
        "sku": "ACC-SL-033",
        "quantity": 1,
        "unitPrice": 50.5,
        "total": 50.5
      }
    ],
    "paymentMethod": "American Express ending in 1005",
    "shippingAddress": {
      "recipient": "Noah Davis",
      "line1": "129 Maple Avenue",
      "city": "Seattle",
      "state": "WA",
      "postalCode": "98101",
      "country": "United States"
    }
  },
  {
    "id": "order_1080",
    "number": "ORD-1080",
    "customer": {
      "id": "customer_011",
      "name": "Amelia Harris",
      "email": "amelia.harris@example.com"
    },
    "createdAt": "2026-08-18T14:30:00.000Z",
    "status": "pending",
    "subtotal": 562.5,
    "shipping": 8.5,
    "tax": 40.78,
    "discount": 15,
    "total": 596.78,
    "items": [
      {
        "id": "item_1080_1",
        "productId": "prod_jacket",
        "productName": "Lightweight Field Jacket",
        "sku": "APP-LF-061",
        "quantity": 2,
        "unitPrice": 150,
        "total": 300
      },
      {
        "id": "item_1080_2",
        "productId": "prod_sweater",
        "productName": "Merino Crew Sweater",
        "sku": "APP-MC-014",
        "quantity": 3,
        "unitPrice": 87.5,
        "total": 262.5
      }
    ],
    "paymentMethod": "Visa ending in 4242",
    "shippingAddress": {
      "recipient": "Amelia Harris",
      "line1": "130 Cedar Lane",
      "city": "Austin",
      "state": "TX",
      "postalCode": "78701",
      "country": "United States"
    }
  },
  {
    "id": "order_1079",
    "number": "ORD-1079",
    "customer": {
      "id": "customer_018",
      "name": "Alexander Wright",
      "email": "alexander.wright@example.com"
    },
    "createdAt": "2026-08-17T14:30:00.000Z",
    "status": "delivered",
    "subtotal": 448.5,
    "shipping": 12,
    "tax": 32.52,
    "discount": 0,
    "total": 493.02,
    "items": [
      {
        "id": "item_1079_1",
        "productId": "prod_mug",
        "productName": "Ceramic Travel Mug",
        "sku": "HOM-CT-052",
        "quantity": 3,
        "unitPrice": 39.5,
        "total": 118.5
      },
      {
        "id": "item_1079_2",
        "productId": "prod_bottle",
        "productName": "Insulated Travel Bottle",
        "sku": "HOM-IT-042",
        "quantity": 1,
        "unitPrice": 35,
        "total": 35
      },
      {
        "id": "item_1079_3",
        "productId": "prod_jacket",
        "productName": "Lightweight Field Jacket",
        "sku": "APP-LF-061",
        "quantity": 2,
        "unitPrice": 147.5,
        "total": 295
      }
    ],
    "paymentMethod": "Mastercard ending in 8821",
    "shippingAddress": {
      "recipient": "Alexander Wright",
      "line1": "131 Pine Road",
      "city": "San Diego",
      "state": "CA",
      "postalCode": "92101",
      "country": "United States"
    }
  },
  {
    "id": "order_1078",
    "number": "ORD-1078",
    "customer": {
      "id": "customer_025",
      "name": "Aria Mitchell",
      "email": "aria.mitchell@example.com"
    },
    "createdAt": "2026-08-16T14:30:00.000Z",
    "status": "shipped",
    "subtotal": 75,
    "shipping": 0,
    "tax": 5.44,
    "discount": 0,
    "total": 80.44,
    "items": [
      {
        "id": "item_1078_1",
        "productId": "prod_backpack",
        "productName": "Everyday Carry Backpack",
        "sku": "BAG-EC-001",
        "quantity": 1,
        "unitPrice": 75,
        "total": 75
      }
    ],
    "paymentMethod": "PayPal",
    "shippingAddress": {
      "recipient": "Aria Mitchell",
      "line1": "132 Oak Street",
      "line2": "Apt 14",
      "city": "Chicago",
      "state": "IL",
      "postalCode": "60601",
      "country": "United States"
    }
  },
  {
    "id": "order_1077",
    "number": "ORD-1077",
    "customer": {
      "id": "customer_002",
      "name": "Ethan Williams",
      "email": "ethan.williams@example.com"
    },
    "createdAt": "2026-08-15T14:30:00.000Z",
    "status": "processing",
    "subtotal": 645,
    "shipping": 5.99,
    "tax": 46.76,
    "discount": 0,
    "total": 697.75,
    "items": [
      {
        "id": "item_1077_1",
        "productId": "prod_headphones",
        "productName": "Studio Wireless Headphones",
        "sku": "ELC-SW-220",
        "quantity": 2,
        "unitPrice": 121.5,
        "total": 243
      },
      {
        "id": "item_1077_2",
        "productId": "prod_keyboard",
        "productName": "Compact Mechanical Keyboard",
        "sku": "ELC-CM-087",
        "quantity": 3,
        "unitPrice": 134,
        "total": 402
      }
    ],
    "paymentMethod": "Visa ending in 1846",
    "shippingAddress": {
      "recipient": "Ethan Williams",
      "line1": "133 Maple Avenue",
      "city": "Portland",
      "state": "OR",
      "postalCode": "97205",
      "country": "United States"
    }
  },
  {
    "id": "order_1076",
    "number": "ORD-1076",
    "customer": {
      "id": "customer_009",
      "name": "Isabella Taylor",
      "email": "isabella.taylor@example.com"
    },
    "createdAt": "2026-08-14T14:30:00.000Z",
    "status": "delivered",
    "subtotal": 583.5,
    "shipping": 8.5,
    "tax": 42.3,
    "discount": 0,
    "total": 634.3,
    "items": [
      {
        "id": "item_1076_1",
        "productId": "prod_sneakers",
        "productName": "Cloudstep Sneakers",
        "sku": "FTW-CS-108",
        "quantity": 3,
        "unitPrice": 103,
        "total": 309
      },
      {
        "id": "item_1076_2",
        "productId": "prod_tote",
        "productName": "Canvas Market Tote",
        "sku": "ACC-CM-025",
        "quantity": 1,
        "unitPrice": 36.5,
        "total": 36.5
      },
      {
        "id": "item_1076_3",
        "productId": "prod_headphones",
        "productName": "Studio Wireless Headphones",
        "sku": "ELC-SW-220",
        "quantity": 2,
        "unitPrice": 119,
        "total": 238
      }
    ],
    "paymentMethod": "American Express ending in 1005",
    "shippingAddress": {
      "recipient": "Isabella Taylor",
      "line1": "134 Cedar Lane",
      "city": "Raleigh",
      "state": "NC",
      "postalCode": "27601",
      "country": "United States"
    }
  },
  {
    "id": "order_1075",
    "number": "ORD-1075",
    "customer": {
      "id": "customer_016",
      "name": "Benjamin Allen",
      "email": "benjamin.allen@example.com"
    },
    "createdAt": "2026-08-13T14:30:00.000Z",
    "status": "cancelled",
    "subtotal": 55.5,
    "shipping": 12,
    "tax": 4.02,
    "discount": 5.55,
    "total": 65.97,
    "items": [
      {
        "id": "item_1075_1",
        "productId": "prod_wallet",
        "productName": "Slim Leather Wallet",
        "sku": "ACC-SL-033",
        "quantity": 1,
        "unitPrice": 55.5,
        "total": 55.5
      }
    ],
    "paymentMethod": "Visa ending in 4242",
    "shippingAddress": {
      "recipient": "Benjamin Allen",
      "line1": "135 Pine Road",
      "city": "Boston",
      "state": "MA",
      "postalCode": "02108",
      "country": "United States"
    }
  },
  {
    "id": "order_1074",
    "number": "ORD-1074",
    "customer": {
      "id": "customer_023",
      "name": "Sofia Nelson",
      "email": "sofia.nelson@example.com"
    },
    "createdAt": "2026-08-12T14:30:00.000Z",
    "status": "pending",
    "subtotal": 537.5,
    "shipping": 0,
    "tax": 38.97,
    "discount": 0,
    "total": 576.47,
    "items": [
      {
        "id": "item_1074_1",
        "productId": "prod_jacket",
        "productName": "Lightweight Field Jacket",
        "sku": "APP-LF-061",
        "quantity": 2,
        "unitPrice": 145,
        "total": 290
      },
      {
        "id": "item_1074_2",
        "productId": "prod_sweater",
        "productName": "Merino Crew Sweater",
        "sku": "APP-MC-014",
        "quantity": 3,
        "unitPrice": 82.5,
        "total": 247.5
      }
    ],
    "paymentMethod": "Mastercard ending in 8821",
    "shippingAddress": {
      "recipient": "Sofia Nelson",
      "line1": "136 Oak Street",
      "city": "Denver",
      "state": "CO",
      "postalCode": "80202",
      "country": "United States"
    }
  },
  {
    "id": "order_1073",
    "number": "ORD-1073",
    "customer": {
      "id": "customer_030",
      "name": "Leo Campbell",
      "email": "leo.campbell@example.com"
    },
    "createdAt": "2026-08-11T14:30:00.000Z",
    "status": "refunded",
    "subtotal": 448.5,
    "shipping": 5.99,
    "tax": 32.52,
    "discount": 0,
    "total": 487.01,
    "items": [
      {
        "id": "item_1073_1",
        "productId": "prod_mug",
        "productName": "Ceramic Travel Mug",
        "sku": "HOM-CT-052",
        "quantity": 3,
        "unitPrice": 34.5,
        "total": 103.5
      },
      {
        "id": "item_1073_2",
        "productId": "prod_bottle",
        "productName": "Insulated Travel Bottle",
        "sku": "HOM-IT-042",
        "quantity": 1,
        "unitPrice": 40,
        "total": 40
      },
      {
        "id": "item_1073_3",
        "productId": "prod_jacket",
        "productName": "Lightweight Field Jacket",
        "sku": "APP-LF-061",
        "quantity": 2,
        "unitPrice": 152.5,
        "total": 305
      }
    ],
    "paymentMethod": "PayPal",
    "shippingAddress": {
      "recipient": "Leo Campbell",
      "line1": "137 Maple Avenue",
      "city": "Brooklyn",
      "state": "NY",
      "postalCode": "11201",
      "country": "United States"
    }
  },
  {
    "id": "order_1072",
    "number": "ORD-1072",
    "customer": {
      "id": "customer_007",
      "name": "Ava Thompson",
      "email": "ava.thompson@example.com"
    },
    "createdAt": "2026-08-10T14:30:00.000Z",
    "status": "delivered",
    "subtotal": 80,
    "shipping": 8.5,
    "tax": 5.8,
    "discount": 0,
    "total": 94.3,
    "items": [
      {
        "id": "item_1072_1",
        "productId": "prod_backpack",
        "productName": "Everyday Carry Backpack",
        "sku": "BAG-EC-001",
        "quantity": 1,
        "unitPrice": 80,
        "total": 80
      }
    ],
    "paymentMethod": "Visa ending in 1846",
    "shippingAddress": {
      "recipient": "Ava Thompson",
      "line1": "138 Cedar Lane",
      "line2": "Apt 2",
      "city": "Nashville",
      "state": "TN",
      "postalCode": "37201",
      "country": "United States"
    }
  },
  {
    "id": "order_1071",
    "number": "ORD-1071",
    "customer": {
      "id": "customer_014",
      "name": "Henry Young",
      "email": "henry.young@example.com"
    },
    "createdAt": "2026-08-09T14:30:00.000Z",
    "status": "pending",
    "subtotal": 640,
    "shipping": 12,
    "tax": 46.4,
    "discount": 0,
    "total": 698.4,
    "items": [
      {
        "id": "item_1071_1",
        "productId": "prod_headphones",
        "productName": "Studio Wireless Headphones",
        "sku": "ELC-SW-220",
        "quantity": 2,
        "unitPrice": 126.5,
        "total": 253
      },
      {
        "id": "item_1071_2",
        "productId": "prod_keyboard",
        "productName": "Compact Mechanical Keyboard",
        "sku": "ELC-CM-087",
        "quantity": 3,
        "unitPrice": 129,
        "total": 387
      }
    ],
    "paymentMethod": "American Express ending in 1005",
    "shippingAddress": {
      "recipient": "Henry Young",
      "line1": "139 Pine Road",
      "city": "Seattle",
      "state": "WA",
      "postalCode": "98101",
      "country": "United States"
    }
  },
  {
    "id": "order_1070",
    "number": "ORD-1070",
    "customer": {
      "id": "customer_021",
      "name": "Camila Baker",
      "email": "camila.baker@example.com"
    },
    "createdAt": "2026-08-08T14:30:00.000Z",
    "status": "processing",
    "subtotal": 573.5,
    "shipping": 0,
    "tax": 41.58,
    "discount": 15,
    "total": 600.08,
    "items": [
      {
        "id": "item_1070_1",
        "productId": "prod_sneakers",
        "productName": "Cloudstep Sneakers",
        "sku": "FTW-CS-108",
        "quantity": 3,
        "unitPrice": 98,
        "total": 294
      },
      {
        "id": "item_1070_2",
        "productId": "prod_tote",
        "productName": "Canvas Market Tote",
        "sku": "ACC-CM-025",
        "quantity": 1,
        "unitPrice": 31.5,
        "total": 31.5
      },
      {
        "id": "item_1070_3",
        "productId": "prod_headphones",
        "productName": "Studio Wireless Headphones",
        "sku": "ELC-SW-220",
        "quantity": 2,
        "unitPrice": 124,
        "total": 248
      }
    ],
    "paymentMethod": "Visa ending in 4242",
    "shippingAddress": {
      "recipient": "Camila Baker",
      "line1": "140 Oak Street",
      "city": "Austin",
      "state": "TX",
      "postalCode": "78701",
      "country": "United States"
    }
  },
  {
    "id": "order_1069",
    "number": "ORD-1069",
    "customer": {
      "id": "customer_028",
      "name": "Samuel Turner",
      "email": "samuel.turner@example.com"
    },
    "createdAt": "2026-08-07T14:30:00.000Z",
    "status": "shipped",
    "subtotal": 50.5,
    "shipping": 5.99,
    "tax": 3.66,
    "discount": 0,
    "total": 60.15,
    "items": [
      {
        "id": "item_1069_1",
        "productId": "prod_wallet",
        "productName": "Slim Leather Wallet",
        "sku": "ACC-SL-033",
        "quantity": 1,
        "unitPrice": 50.5,
        "total": 50.5
      }
    ],
    "paymentMethod": "Mastercard ending in 8821",
    "shippingAddress": {
      "recipient": "Samuel Turner",
      "line1": "141 Maple Avenue",
      "city": "San Diego",
      "state": "CA",
      "postalCode": "92101",
      "country": "United States"
    }
  },
  {
    "id": "order_1068",
    "number": "ORD-1068",
    "customer": {
      "id": "customer_005",
      "name": "Mia Anderson",
      "email": "mia.anderson@example.com"
    },
    "createdAt": "2026-08-06T14:30:00.000Z",
    "status": "delivered",
    "subtotal": 562.5,
    "shipping": 8.5,
    "tax": 40.78,
    "discount": 0,
    "total": 611.78,
    "items": [
      {
        "id": "item_1068_1",
        "productId": "prod_jacket",
        "productName": "Lightweight Field Jacket",
        "sku": "APP-LF-061",
        "quantity": 2,
        "unitPrice": 150,
        "total": 300
      },
      {
        "id": "item_1068_2",
        "productId": "prod_sweater",
        "productName": "Merino Crew Sweater",
        "sku": "APP-MC-014",
        "quantity": 3,
        "unitPrice": 87.5,
        "total": 262.5
      }
    ],
    "paymentMethod": "PayPal",
    "shippingAddress": {
      "recipient": "Mia Anderson",
      "line1": "142 Cedar Lane",
      "city": "Chicago",
      "state": "IL",
      "postalCode": "60601",
      "country": "United States"
    }
  },
  {
    "id": "order_1067",
    "number": "ORD-1067",
    "customer": {
      "id": "customer_012",
      "name": "James Lewis",
      "email": "james.lewis@example.com"
    },
    "createdAt": "2026-08-05T14:30:00.000Z",
    "status": "delivered",
    "subtotal": 448.5,
    "shipping": 12,
    "tax": 32.52,
    "discount": 0,
    "total": 493.02,
    "items": [
      {
        "id": "item_1067_1",
        "productId": "prod_mug",
        "productName": "Ceramic Travel Mug",
        "sku": "HOM-CT-052",
        "quantity": 3,
        "unitPrice": 39.5,
        "total": 118.5
      },
      {
        "id": "item_1067_2",
        "productId": "prod_bottle",
        "productName": "Insulated Travel Bottle",
        "sku": "HOM-IT-042",
        "quantity": 1,
        "unitPrice": 35,
        "total": 35
      },
      {
        "id": "item_1067_3",
        "productId": "prod_jacket",
        "productName": "Lightweight Field Jacket",
        "sku": "APP-LF-061",
        "quantity": 2,
        "unitPrice": 147.5,
        "total": 295
      }
    ],
    "paymentMethod": "Visa ending in 1846",
    "shippingAddress": {
      "recipient": "James Lewis",
      "line1": "143 Pine Road",
      "city": "Portland",
      "state": "OR",
      "postalCode": "97205",
      "country": "United States"
    }
  },
  {
    "id": "order_1066",
    "number": "ORD-1066",
    "customer": {
      "id": "customer_019",
      "name": "Luna Scott",
      "email": "luna.scott@example.com"
    },
    "createdAt": "2026-08-04T14:30:00.000Z",
    "status": "processing",
    "subtotal": 75,
    "shipping": 0,
    "tax": 5.44,
    "discount": 0,
    "total": 80.44,
    "items": [
      {
        "id": "item_1066_1",
        "productId": "prod_backpack",
        "productName": "Everyday Carry Backpack",
        "sku": "BAG-EC-001",
        "quantity": 1,
        "unitPrice": 75,
        "total": 75
      }
    ],
    "paymentMethod": "American Express ending in 1005",
    "shippingAddress": {
      "recipient": "Luna Scott",
      "line1": "144 Oak Street",
      "line2": "Apt 8",
      "city": "Raleigh",
      "state": "NC",
      "postalCode": "27601",
      "country": "United States"
    }
  },
  {
    "id": "order_1065",
    "number": "ORD-1065",
    "customer": {
      "id": "customer_026",
      "name": "Mateo Perez",
      "email": "mateo.perez@example.com"
    },
    "createdAt": "2026-08-03T14:30:00.000Z",
    "status": "shipped",
    "subtotal": 645,
    "shipping": 5.99,
    "tax": 46.76,
    "discount": 15,
    "total": 682.75,
    "items": [
      {
        "id": "item_1065_1",
        "productId": "prod_headphones",
        "productName": "Studio Wireless Headphones",
        "sku": "ELC-SW-220",
        "quantity": 2,
        "unitPrice": 121.5,
        "total": 243
      },
      {
        "id": "item_1065_2",
        "productId": "prod_keyboard",
        "productName": "Compact Mechanical Keyboard",
        "sku": "ELC-CM-087",
        "quantity": 3,
        "unitPrice": 134,
        "total": 402
      }
    ],
    "paymentMethod": "Visa ending in 4242",
    "shippingAddress": {
      "recipient": "Mateo Perez",
      "line1": "145 Maple Avenue",
      "city": "Boston",
      "state": "MA",
      "postalCode": "02108",
      "country": "United States"
    }
  },
  {
    "id": "order_1064",
    "number": "ORD-1064",
    "customer": {
      "id": "customer_003",
      "name": "Sophia Brown",
      "email": "sophia.brown@example.com"
    },
    "createdAt": "2026-08-02T14:30:00.000Z",
    "status": "cancelled",
    "subtotal": 583.5,
    "shipping": 8.5,
    "tax": 42.3,
    "discount": 0,
    "total": 634.3,
    "items": [
      {
        "id": "item_1064_1",
        "productId": "prod_sneakers",
        "productName": "Cloudstep Sneakers",
        "sku": "FTW-CS-108",
        "quantity": 3,
        "unitPrice": 103,
        "total": 309
      },
      {
        "id": "item_1064_2",
        "productId": "prod_tote",
        "productName": "Canvas Market Tote",
        "sku": "ACC-CM-025",
        "quantity": 1,
        "unitPrice": 36.5,
        "total": 36.5
      },
      {
        "id": "item_1064_3",
        "productId": "prod_headphones",
        "productName": "Studio Wireless Headphones",
        "sku": "ELC-SW-220",
        "quantity": 2,
        "unitPrice": 119,
        "total": 238
      }
    ],
    "paymentMethod": "Mastercard ending in 8821",
    "shippingAddress": {
      "recipient": "Sophia Brown",
      "line1": "146 Cedar Lane",
      "city": "Denver",
      "state": "CO",
      "postalCode": "80202",
      "country": "United States"
    }
  },
  {
    "id": "order_1063",
    "number": "ORD-1063",
    "customer": {
      "id": "customer_010",
      "name": "Mason Clark",
      "email": "mason.clark@example.com"
    },
    "createdAt": "2026-08-01T14:30:00.000Z",
    "status": "delivered",
    "subtotal": 55.5,
    "shipping": 12,
    "tax": 4.02,
    "discount": 0,
    "total": 71.52,
    "items": [
      {
        "id": "item_1063_1",
        "productId": "prod_wallet",
        "productName": "Slim Leather Wallet",
        "sku": "ACC-SL-033",
        "quantity": 1,
        "unitPrice": 55.5,
        "total": 55.5
      }
    ],
    "paymentMethod": "PayPal",
    "shippingAddress": {
      "recipient": "Mason Clark",
      "line1": "147 Pine Road",
      "city": "Brooklyn",
      "state": "NY",
      "postalCode": "11201",
      "country": "United States"
    }
  },
  {
    "id": "order_1062",
    "number": "ORD-1062",
    "customer": {
      "id": "customer_017",
      "name": "Charlotte King",
      "email": "charlotte.king@example.com"
    },
    "createdAt": "2026-07-31T14:30:00.000Z",
    "status": "pending",
    "subtotal": 537.5,
    "shipping": 0,
    "tax": 38.97,
    "discount": 0,
    "total": 576.47,
    "items": [
      {
        "id": "item_1062_1",
        "productId": "prod_jacket",
        "productName": "Lightweight Field Jacket",
        "sku": "APP-LF-061",
        "quantity": 2,
        "unitPrice": 145,
        "total": 290
      },
      {
        "id": "item_1062_2",
        "productId": "prod_sweater",
        "productName": "Merino Crew Sweater",
        "sku": "APP-MC-014",
        "quantity": 3,
        "unitPrice": 82.5,
        "total": 247.5
      }
    ],
    "paymentMethod": "Visa ending in 1846",
    "shippingAddress": {
      "recipient": "Charlotte King",
      "line1": "148 Oak Street",
      "city": "Nashville",
      "state": "TN",
      "postalCode": "37201",
      "country": "United States"
    }
  },
  {
    "id": "order_1061",
    "number": "ORD-1061",
    "customer": {
      "id": "customer_024",
      "name": "Sebastian Carter",
      "email": "sebastian.carter@example.com"
    },
    "createdAt": "2026-07-30T14:30:00.000Z",
    "status": "delivered",
    "subtotal": 448.5,
    "shipping": 5.99,
    "tax": 32.52,
    "discount": 0,
    "total": 487.01,
    "items": [
      {
        "id": "item_1061_1",
        "productId": "prod_mug",
        "productName": "Ceramic Travel Mug",
        "sku": "HOM-CT-052",
        "quantity": 3,
        "unitPrice": 34.5,
        "total": 103.5
      },
      {
        "id": "item_1061_2",
        "productId": "prod_bottle",
        "productName": "Insulated Travel Bottle",
        "sku": "HOM-IT-042",
        "quantity": 1,
        "unitPrice": 40,
        "total": 40
      },
      {
        "id": "item_1061_3",
        "productId": "prod_jacket",
        "productName": "Lightweight Field Jacket",
        "sku": "APP-LF-061",
        "quantity": 2,
        "unitPrice": 152.5,
        "total": 305
      }
    ],
    "paymentMethod": "American Express ending in 1005",
    "shippingAddress": {
      "recipient": "Sebastian Carter",
      "line1": "149 Maple Avenue",
      "city": "Seattle",
      "state": "WA",
      "postalCode": "98101",
      "country": "United States"
    }
  },
  {
    "id": "order_1060",
    "number": "ORD-1060",
    "customer": {
      "id": "customer_001",
      "name": "Olivia Martin",
      "email": "olivia.martin@example.com"
    },
    "createdAt": "2026-07-29T14:30:00.000Z",
    "status": "shipped",
    "subtotal": 80,
    "shipping": 8.5,
    "tax": 5.8,
    "discount": 8,
    "total": 86.3,
    "items": [
      {
        "id": "item_1060_1",
        "productId": "prod_backpack",
        "productName": "Everyday Carry Backpack",
        "sku": "BAG-EC-001",
        "quantity": 1,
        "unitPrice": 80,
        "total": 80
      }
    ],
    "paymentMethod": "Visa ending in 4242",
    "shippingAddress": {
      "recipient": "Olivia Martin",
      "line1": "150 Cedar Lane",
      "line2": "Apt 14",
      "city": "Austin",
      "state": "TX",
      "postalCode": "78701",
      "country": "United States"
    }
  },
  {
    "id": "order_1059",
    "number": "ORD-1059",
    "customer": {
      "id": "customer_008",
      "name": "Lucas Moore",
      "email": "lucas.moore@example.com"
    },
    "createdAt": "2026-07-28T14:30:00.000Z",
    "status": "processing",
    "subtotal": 640,
    "shipping": 12,
    "tax": 46.4,
    "discount": 0,
    "total": 698.4,
    "items": [
      {
        "id": "item_1059_1",
        "productId": "prod_headphones",
        "productName": "Studio Wireless Headphones",
        "sku": "ELC-SW-220",
        "quantity": 2,
        "unitPrice": 126.5,
        "total": 253
      },
      {
        "id": "item_1059_2",
        "productId": "prod_keyboard",
        "productName": "Compact Mechanical Keyboard",
        "sku": "ELC-CM-087",
        "quantity": 3,
        "unitPrice": 129,
        "total": 387
      }
    ],
    "paymentMethod": "Mastercard ending in 8821",
    "shippingAddress": {
      "recipient": "Lucas Moore",
      "line1": "151 Pine Road",
      "city": "San Diego",
      "state": "CA",
      "postalCode": "92101",
      "country": "United States"
    }
  },
  {
    "id": "order_1058",
    "number": "ORD-1058",
    "customer": {
      "id": "customer_015",
      "name": "Evelyn Hall",
      "email": "evelyn.hall@example.com"
    },
    "createdAt": "2026-07-27T14:30:00.000Z",
    "status": "delivered",
    "subtotal": 573.5,
    "shipping": 0,
    "tax": 41.58,
    "discount": 0,
    "total": 615.08,
    "items": [
      {
        "id": "item_1058_1",
        "productId": "prod_sneakers",
        "productName": "Cloudstep Sneakers",
        "sku": "FTW-CS-108",
        "quantity": 3,
        "unitPrice": 98,
        "total": 294
      },
      {
        "id": "item_1058_2",
        "productId": "prod_tote",
        "productName": "Canvas Market Tote",
        "sku": "ACC-CM-025",
        "quantity": 1,
        "unitPrice": 31.5,
        "total": 31.5
      },
      {
        "id": "item_1058_3",
        "productId": "prod_headphones",
        "productName": "Studio Wireless Headphones",
        "sku": "ELC-SW-220",
        "quantity": 2,
        "unitPrice": 124,
        "total": 248
      }
    ],
    "paymentMethod": "PayPal",
    "shippingAddress": {
      "recipient": "Evelyn Hall",
      "line1": "152 Oak Street",
      "city": "Chicago",
      "state": "IL",
      "postalCode": "60601",
      "country": "United States"
    }
  },
  {
    "id": "order_1057",
    "number": "ORD-1057",
    "customer": {
      "id": "customer_022",
      "name": "Jack Adams",
      "email": "jack.adams@example.com"
    },
    "createdAt": "2026-07-26T14:30:00.000Z",
    "status": "cancelled",
    "subtotal": 50.5,
    "shipping": 5.99,
    "tax": 3.66,
    "discount": 0,
    "total": 60.15,
    "items": [
      {
        "id": "item_1057_1",
        "productId": "prod_wallet",
        "productName": "Slim Leather Wallet",
        "sku": "ACC-SL-033",
        "quantity": 1,
        "unitPrice": 50.5,
        "total": 50.5
      }
    ],
    "paymentMethod": "Visa ending in 1846",
    "shippingAddress": {
      "recipient": "Jack Adams",
      "line1": "153 Maple Avenue",
      "city": "Portland",
      "state": "OR",
      "postalCode": "97205",
      "country": "United States"
    }
  },
  {
    "id": "order_1056",
    "number": "ORD-1056",
    "customer": {
      "id": "customer_029",
      "name": "Layla Phillips",
      "email": "layla.phillips@example.com"
    },
    "createdAt": "2026-07-25T14:30:00.000Z",
    "status": "pending",
    "subtotal": 562.5,
    "shipping": 8.5,
    "tax": 40.78,
    "discount": 0,
    "total": 611.78,
    "items": [
      {
        "id": "item_1056_1",
        "productId": "prod_jacket",
        "productName": "Lightweight Field Jacket",
        "sku": "APP-LF-061",
        "quantity": 2,
        "unitPrice": 150,
        "total": 300
      },
      {
        "id": "item_1056_2",
        "productId": "prod_sweater",
        "productName": "Merino Crew Sweater",
        "sku": "APP-MC-014",
        "quantity": 3,
        "unitPrice": 87.5,
        "total": 262.5
      }
    ],
    "paymentMethod": "American Express ending in 1005",
    "shippingAddress": {
      "recipient": "Layla Phillips",
      "line1": "154 Cedar Lane",
      "city": "Raleigh",
      "state": "NC",
      "postalCode": "27601",
      "country": "United States"
    }
  },
  {
    "id": "order_1055",
    "number": "ORD-1055",
    "customer": {
      "id": "customer_006",
      "name": "Liam Wilson",
      "email": "liam.wilson@example.com"
    },
    "createdAt": "2026-07-24T14:30:00.000Z",
    "status": "refunded",
    "subtotal": 448.5,
    "shipping": 12,
    "tax": 32.52,
    "discount": 15,
    "total": 478.02,
    "items": [
      {
        "id": "item_1055_1",
        "productId": "prod_mug",
        "productName": "Ceramic Travel Mug",
        "sku": "HOM-CT-052",
        "quantity": 3,
        "unitPrice": 39.5,
        "total": 118.5
      },
      {
        "id": "item_1055_2",
        "productId": "prod_bottle",
        "productName": "Insulated Travel Bottle",
        "sku": "HOM-IT-042",
        "quantity": 1,
        "unitPrice": 35,
        "total": 35
      },
      {
        "id": "item_1055_3",
        "productId": "prod_jacket",
        "productName": "Lightweight Field Jacket",
        "sku": "APP-LF-061",
        "quantity": 2,
        "unitPrice": 147.5,
        "total": 295
      }
    ],
    "paymentMethod": "Visa ending in 4242",
    "shippingAddress": {
      "recipient": "Liam Wilson",
      "line1": "155 Pine Road",
      "city": "Boston",
      "state": "MA",
      "postalCode": "02108",
      "country": "United States"
    }
  },
  {
    "id": "order_1054",
    "number": "ORD-1054",
    "customer": {
      "id": "customer_013",
      "name": "Harper Walker",
      "email": "harper.walker@example.com"
    },
    "createdAt": "2026-07-23T14:30:00.000Z",
    "status": "delivered",
    "subtotal": 75,
    "shipping": 0,
    "tax": 5.44,
    "discount": 0,
    "total": 80.44,
    "items": [
      {
        "id": "item_1054_1",
        "productId": "prod_backpack",
        "productName": "Everyday Carry Backpack",
        "sku": "BAG-EC-001",
        "quantity": 1,
        "unitPrice": 75,
        "total": 75
      }
    ],
    "paymentMethod": "Mastercard ending in 8821",
    "shippingAddress": {
      "recipient": "Harper Walker",
      "line1": "156 Oak Street",
      "line2": "Apt 2",
      "city": "Denver",
      "state": "CO",
      "postalCode": "80202",
      "country": "United States"
    }
  },
  {
    "id": "order_1053",
    "number": "ORD-1053",
    "customer": {
      "id": "customer_020",
      "name": "Daniel Green",
      "email": "daniel.green@example.com"
    },
    "createdAt": "2026-07-22T14:30:00.000Z",
    "status": "pending",
    "subtotal": 645,
    "shipping": 5.99,
    "tax": 46.76,
    "discount": 0,
    "total": 697.75,
    "items": [
      {
        "id": "item_1053_1",
        "productId": "prod_headphones",
        "productName": "Studio Wireless Headphones",
        "sku": "ELC-SW-220",
        "quantity": 2,
        "unitPrice": 121.5,
        "total": 243
      },
      {
        "id": "item_1053_2",
        "productId": "prod_keyboard",
        "productName": "Compact Mechanical Keyboard",
        "sku": "ELC-CM-087",
        "quantity": 3,
        "unitPrice": 134,
        "total": 402
      }
    ],
    "paymentMethod": "PayPal",
    "shippingAddress": {
      "recipient": "Daniel Green",
      "line1": "157 Maple Avenue",
      "city": "Brooklyn",
      "state": "NY",
      "postalCode": "11201",
      "country": "United States"
    }
  },
  {
    "id": "order_1052",
    "number": "ORD-1052",
    "customer": {
      "id": "customer_027",
      "name": "Chloe Roberts",
      "email": "chloe.roberts@example.com"
    },
    "createdAt": "2026-07-21T14:30:00.000Z",
    "status": "processing",
    "subtotal": 583.5,
    "shipping": 8.5,
    "tax": 42.3,
    "discount": 0,
    "total": 634.3,
    "items": [
      {
        "id": "item_1052_1",
        "productId": "prod_sneakers",
        "productName": "Cloudstep Sneakers",
        "sku": "FTW-CS-108",
        "quantity": 3,
        "unitPrice": 103,
        "total": 309
      },
      {
        "id": "item_1052_2",
        "productId": "prod_tote",
        "productName": "Canvas Market Tote",
        "sku": "ACC-CM-025",
        "quantity": 1,
        "unitPrice": 36.5,
        "total": 36.5
      },
      {
        "id": "item_1052_3",
        "productId": "prod_headphones",
        "productName": "Studio Wireless Headphones",
        "sku": "ELC-SW-220",
        "quantity": 2,
        "unitPrice": 119,
        "total": 238
      }
    ],
    "paymentMethod": "Visa ending in 1846",
    "shippingAddress": {
      "recipient": "Chloe Roberts",
      "line1": "158 Cedar Lane",
      "city": "Nashville",
      "state": "TN",
      "postalCode": "37201",
      "country": "United States"
    }
  },
  {
    "id": "order_1051",
    "number": "ORD-1051",
    "customer": {
      "id": "customer_004",
      "name": "Noah Davis",
      "email": "noah.davis@example.com"
    },
    "createdAt": "2026-07-20T14:30:00.000Z",
    "status": "shipped",
    "subtotal": 55.5,
    "shipping": 12,
    "tax": 4.02,
    "discount": 0,
    "total": 71.52,
    "items": [
      {
        "id": "item_1051_1",
        "productId": "prod_wallet",
        "productName": "Slim Leather Wallet",
        "sku": "ACC-SL-033",
        "quantity": 1,
        "unitPrice": 55.5,
        "total": 55.5
      }
    ],
    "paymentMethod": "American Express ending in 1005",
    "shippingAddress": {
      "recipient": "Noah Davis",
      "line1": "159 Pine Road",
      "city": "Seattle",
      "state": "WA",
      "postalCode": "98101",
      "country": "United States"
    }
  },
  {
    "id": "order_1050",
    "number": "ORD-1050",
    "customer": {
      "id": "customer_011",
      "name": "Amelia Harris",
      "email": "amelia.harris@example.com"
    },
    "createdAt": "2026-07-19T14:30:00.000Z",
    "status": "delivered",
    "subtotal": 537.5,
    "shipping": 0,
    "tax": 38.97,
    "discount": 15,
    "total": 561.47,
    "items": [
      {
        "id": "item_1050_1",
        "productId": "prod_jacket",
        "productName": "Lightweight Field Jacket",
        "sku": "APP-LF-061",
        "quantity": 2,
        "unitPrice": 145,
        "total": 290
      },
      {
        "id": "item_1050_2",
        "productId": "prod_sweater",
        "productName": "Merino Crew Sweater",
        "sku": "APP-MC-014",
        "quantity": 3,
        "unitPrice": 82.5,
        "total": 247.5
      }
    ],
    "paymentMethod": "Visa ending in 4242",
    "shippingAddress": {
      "recipient": "Amelia Harris",
      "line1": "160 Oak Street",
      "city": "Austin",
      "state": "TX",
      "postalCode": "78701",
      "country": "United States"
    }
  },
  {
    "id": "order_1049",
    "number": "ORD-1049",
    "customer": {
      "id": "customer_018",
      "name": "Alexander Wright",
      "email": "alexander.wright@example.com"
    },
    "createdAt": "2026-07-18T14:30:00.000Z",
    "status": "delivered",
    "subtotal": 448.5,
    "shipping": 5.99,
    "tax": 32.52,
    "discount": 0,
    "total": 487.01,
    "items": [
      {
        "id": "item_1049_1",
        "productId": "prod_mug",
        "productName": "Ceramic Travel Mug",
        "sku": "HOM-CT-052",
        "quantity": 3,
        "unitPrice": 34.5,
        "total": 103.5
      },
      {
        "id": "item_1049_2",
        "productId": "prod_bottle",
        "productName": "Insulated Travel Bottle",
        "sku": "HOM-IT-042",
        "quantity": 1,
        "unitPrice": 40,
        "total": 40
      },
      {
        "id": "item_1049_3",
        "productId": "prod_jacket",
        "productName": "Lightweight Field Jacket",
        "sku": "APP-LF-061",
        "quantity": 2,
        "unitPrice": 152.5,
        "total": 305
      }
    ],
    "paymentMethod": "Mastercard ending in 8821",
    "shippingAddress": {
      "recipient": "Alexander Wright",
      "line1": "161 Maple Avenue",
      "city": "San Diego",
      "state": "CA",
      "postalCode": "92101",
      "country": "United States"
    }
  },
  {
    "id": "order_1048",
    "number": "ORD-1048",
    "customer": {
      "id": "customer_025",
      "name": "Aria Mitchell",
      "email": "aria.mitchell@example.com"
    },
    "createdAt": "2026-07-17T14:30:00.000Z",
    "status": "processing",
    "subtotal": 80,
    "shipping": 8.5,
    "tax": 5.8,
    "discount": 0,
    "total": 94.3,
    "items": [
      {
        "id": "item_1048_1",
        "productId": "prod_backpack",
        "productName": "Everyday Carry Backpack",
        "sku": "BAG-EC-001",
        "quantity": 1,
        "unitPrice": 80,
        "total": 80
      }
    ],
    "paymentMethod": "PayPal",
    "shippingAddress": {
      "recipient": "Aria Mitchell",
      "line1": "162 Cedar Lane",
      "line2": "Apt 8",
      "city": "Chicago",
      "state": "IL",
      "postalCode": "60601",
      "country": "United States"
    }
  },
  {
    "id": "order_1047",
    "number": "ORD-1047",
    "customer": {
      "id": "customer_002",
      "name": "Ethan Williams",
      "email": "ethan.williams@example.com"
    },
    "createdAt": "2026-07-16T14:30:00.000Z",
    "status": "shipped",
    "subtotal": 640,
    "shipping": 12,
    "tax": 46.4,
    "discount": 0,
    "total": 698.4,
    "items": [
      {
        "id": "item_1047_1",
        "productId": "prod_headphones",
        "productName": "Studio Wireless Headphones",
        "sku": "ELC-SW-220",
        "quantity": 2,
        "unitPrice": 126.5,
        "total": 253
      },
      {
        "id": "item_1047_2",
        "productId": "prod_keyboard",
        "productName": "Compact Mechanical Keyboard",
        "sku": "ELC-CM-087",
        "quantity": 3,
        "unitPrice": 129,
        "total": 387
      }
    ],
    "paymentMethod": "Visa ending in 1846",
    "shippingAddress": {
      "recipient": "Ethan Williams",
      "line1": "163 Pine Road",
      "city": "Portland",
      "state": "OR",
      "postalCode": "97205",
      "country": "United States"
    }
  },
  {
    "id": "order_1046",
    "number": "ORD-1046",
    "customer": {
      "id": "customer_009",
      "name": "Isabella Taylor",
      "email": "isabella.taylor@example.com"
    },
    "createdAt": "2026-07-15T14:30:00.000Z",
    "status": "cancelled",
    "subtotal": 573.5,
    "shipping": 0,
    "tax": 41.58,
    "discount": 0,
    "total": 615.08,
    "items": [
      {
        "id": "item_1046_1",
        "productId": "prod_sneakers",
        "productName": "Cloudstep Sneakers",
        "sku": "FTW-CS-108",
        "quantity": 3,
        "unitPrice": 98,
        "total": 294
      },
      {
        "id": "item_1046_2",
        "productId": "prod_tote",
        "productName": "Canvas Market Tote",
        "sku": "ACC-CM-025",
        "quantity": 1,
        "unitPrice": 31.5,
        "total": 31.5
      },
      {
        "id": "item_1046_3",
        "productId": "prod_headphones",
        "productName": "Studio Wireless Headphones",
        "sku": "ELC-SW-220",
        "quantity": 2,
        "unitPrice": 124,
        "total": 248
      }
    ],
    "paymentMethod": "American Express ending in 1005",
    "shippingAddress": {
      "recipient": "Isabella Taylor",
      "line1": "164 Oak Street",
      "city": "Raleigh",
      "state": "NC",
      "postalCode": "27601",
      "country": "United States"
    }
  },
  {
    "id": "order_1045",
    "number": "ORD-1045",
    "customer": {
      "id": "customer_016",
      "name": "Benjamin Allen",
      "email": "benjamin.allen@example.com"
    },
    "createdAt": "2026-07-14T14:30:00.000Z",
    "status": "delivered",
    "subtotal": 50.5,
    "shipping": 5.99,
    "tax": 3.66,
    "discount": 5.05,
    "total": 55.1,
    "items": [
      {
        "id": "item_1045_1",
        "productId": "prod_wallet",
        "productName": "Slim Leather Wallet",
        "sku": "ACC-SL-033",
        "quantity": 1,
        "unitPrice": 50.5,
        "total": 50.5
      }
    ],
    "paymentMethod": "Visa ending in 4242",
    "shippingAddress": {
      "recipient": "Benjamin Allen",
      "line1": "165 Maple Avenue",
      "city": "Boston",
      "state": "MA",
      "postalCode": "02108",
      "country": "United States"
    }
  },
  {
    "id": "order_1044",
    "number": "ORD-1044",
    "customer": {
      "id": "customer_023",
      "name": "Sofia Nelson",
      "email": "sofia.nelson@example.com"
    },
    "createdAt": "2026-07-13T14:30:00.000Z",
    "status": "pending",
    "subtotal": 562.5,
    "shipping": 8.5,
    "tax": 40.78,
    "discount": 0,
    "total": 611.78,
    "items": [
      {
        "id": "item_1044_1",
        "productId": "prod_jacket",
        "productName": "Lightweight Field Jacket",
        "sku": "APP-LF-061",
        "quantity": 2,
        "unitPrice": 150,
        "total": 300
      },
      {
        "id": "item_1044_2",
        "productId": "prod_sweater",
        "productName": "Merino Crew Sweater",
        "sku": "APP-MC-014",
        "quantity": 3,
        "unitPrice": 87.5,
        "total": 262.5
      }
    ],
    "paymentMethod": "Mastercard ending in 8821",
    "shippingAddress": {
      "recipient": "Sofia Nelson",
      "line1": "166 Cedar Lane",
      "city": "Denver",
      "state": "CO",
      "postalCode": "80202",
      "country": "United States"
    }
  },
  {
    "id": "order_1043",
    "number": "ORD-1043",
    "customer": {
      "id": "customer_030",
      "name": "Leo Campbell",
      "email": "leo.campbell@example.com"
    },
    "createdAt": "2026-07-12T14:30:00.000Z",
    "status": "delivered",
    "subtotal": 448.5,
    "shipping": 12,
    "tax": 32.52,
    "discount": 0,
    "total": 493.02,
    "items": [
      {
        "id": "item_1043_1",
        "productId": "prod_mug",
        "productName": "Ceramic Travel Mug",
        "sku": "HOM-CT-052",
        "quantity": 3,
        "unitPrice": 39.5,
        "total": 118.5
      },
      {
        "id": "item_1043_2",
        "productId": "prod_bottle",
        "productName": "Insulated Travel Bottle",
        "sku": "HOM-IT-042",
        "quantity": 1,
        "unitPrice": 35,
        "total": 35
      },
      {
        "id": "item_1043_3",
        "productId": "prod_jacket",
        "productName": "Lightweight Field Jacket",
        "sku": "APP-LF-061",
        "quantity": 2,
        "unitPrice": 147.5,
        "total": 295
      }
    ],
    "paymentMethod": "PayPal",
    "shippingAddress": {
      "recipient": "Leo Campbell",
      "line1": "167 Pine Road",
      "city": "Brooklyn",
      "state": "NY",
      "postalCode": "11201",
      "country": "United States"
    }
  },
  {
    "id": "order_1042",
    "number": "ORD-1042",
    "customer": {
      "id": "customer_007",
      "name": "Ava Thompson",
      "email": "ava.thompson@example.com"
    },
    "createdAt": "2026-07-11T14:30:00.000Z",
    "status": "shipped",
    "subtotal": 75,
    "shipping": 0,
    "tax": 5.44,
    "discount": 0,
    "total": 80.44,
    "items": [
      {
        "id": "item_1042_1",
        "productId": "prod_backpack",
        "productName": "Everyday Carry Backpack",
        "sku": "BAG-EC-001",
        "quantity": 1,
        "unitPrice": 75,
        "total": 75
      }
    ],
    "paymentMethod": "Visa ending in 1846",
    "shippingAddress": {
      "recipient": "Ava Thompson",
      "line1": "168 Oak Street",
      "line2": "Apt 14",
      "city": "Nashville",
      "state": "TN",
      "postalCode": "37201",
      "country": "United States"
    }
  },
  {
    "id": "order_1041",
    "number": "ORD-1041",
    "customer": {
      "id": "customer_014",
      "name": "Henry Young",
      "email": "henry.young@example.com"
    },
    "createdAt": "2026-07-10T14:30:00.000Z",
    "status": "processing",
    "subtotal": 645,
    "shipping": 5.99,
    "tax": 46.76,
    "discount": 0,
    "total": 697.75,
    "items": [
      {
        "id": "item_1041_1",
        "productId": "prod_headphones",
        "productName": "Studio Wireless Headphones",
        "sku": "ELC-SW-220",
        "quantity": 2,
        "unitPrice": 121.5,
        "total": 243
      },
      {
        "id": "item_1041_2",
        "productId": "prod_keyboard",
        "productName": "Compact Mechanical Keyboard",
        "sku": "ELC-CM-087",
        "quantity": 3,
        "unitPrice": 134,
        "total": 402
      }
    ],
    "paymentMethod": "American Express ending in 1005",
    "shippingAddress": {
      "recipient": "Henry Young",
      "line1": "169 Maple Avenue",
      "city": "Seattle",
      "state": "WA",
      "postalCode": "98101",
      "country": "United States"
    }
  },
  {
    "id": "order_1040",
    "number": "ORD-1040",
    "customer": {
      "id": "customer_021",
      "name": "Camila Baker",
      "email": "camila.baker@example.com"
    },
    "createdAt": "2026-07-09T14:30:00.000Z",
    "status": "delivered",
    "subtotal": 583.5,
    "shipping": 8.5,
    "tax": 42.3,
    "discount": 15,
    "total": 619.3,
    "items": [
      {
        "id": "item_1040_1",
        "productId": "prod_sneakers",
        "productName": "Cloudstep Sneakers",
        "sku": "FTW-CS-108",
        "quantity": 3,
        "unitPrice": 103,
        "total": 309
      },
      {
        "id": "item_1040_2",
        "productId": "prod_tote",
        "productName": "Canvas Market Tote",
        "sku": "ACC-CM-025",
        "quantity": 1,
        "unitPrice": 36.5,
        "total": 36.5
      },
      {
        "id": "item_1040_3",
        "productId": "prod_headphones",
        "productName": "Studio Wireless Headphones",
        "sku": "ELC-SW-220",
        "quantity": 2,
        "unitPrice": 119,
        "total": 238
      }
    ],
    "paymentMethod": "Visa ending in 4242",
    "shippingAddress": {
      "recipient": "Camila Baker",
      "line1": "170 Cedar Lane",
      "city": "Austin",
      "state": "TX",
      "postalCode": "78701",
      "country": "United States"
    }
  },
  {
    "id": "order_1039",
    "number": "ORD-1039",
    "customer": {
      "id": "customer_028",
      "name": "Samuel Turner",
      "email": "samuel.turner@example.com"
    },
    "createdAt": "2026-07-08T14:30:00.000Z",
    "status": "cancelled",
    "subtotal": 55.5,
    "shipping": 12,
    "tax": 4.02,
    "discount": 0,
    "total": 71.52,
    "items": [
      {
        "id": "item_1039_1",
        "productId": "prod_wallet",
        "productName": "Slim Leather Wallet",
        "sku": "ACC-SL-033",
        "quantity": 1,
        "unitPrice": 55.5,
        "total": 55.5
      }
    ],
    "paymentMethod": "Mastercard ending in 8821",
    "shippingAddress": {
      "recipient": "Samuel Turner",
      "line1": "171 Pine Road",
      "city": "San Diego",
      "state": "CA",
      "postalCode": "92101",
      "country": "United States"
    }
  },
  {
    "id": "order_1038",
    "number": "ORD-1038",
    "customer": {
      "id": "customer_005",
      "name": "Mia Anderson",
      "email": "mia.anderson@example.com"
    },
    "createdAt": "2026-07-07T14:30:00.000Z",
    "status": "pending",
    "subtotal": 537.5,
    "shipping": 0,
    "tax": 38.97,
    "discount": 0,
    "total": 576.47,
    "items": [
      {
        "id": "item_1038_1",
        "productId": "prod_jacket",
        "productName": "Lightweight Field Jacket",
        "sku": "APP-LF-061",
        "quantity": 2,
        "unitPrice": 145,
        "total": 290
      },
      {
        "id": "item_1038_2",
        "productId": "prod_sweater",
        "productName": "Merino Crew Sweater",
        "sku": "APP-MC-014",
        "quantity": 3,
        "unitPrice": 82.5,
        "total": 247.5
      }
    ],
    "paymentMethod": "PayPal",
    "shippingAddress": {
      "recipient": "Mia Anderson",
      "line1": "172 Oak Street",
      "city": "Chicago",
      "state": "IL",
      "postalCode": "60601",
      "country": "United States"
    }
  },
  {
    "id": "order_1037",
    "number": "ORD-1037",
    "customer": {
      "id": "customer_012",
      "name": "James Lewis",
      "email": "james.lewis@example.com"
    },
    "createdAt": "2026-07-06T14:30:00.000Z",
    "status": "refunded",
    "subtotal": 448.5,
    "shipping": 5.99,
    "tax": 32.52,
    "discount": 0,
    "total": 487.01,
    "items": [
      {
        "id": "item_1037_1",
        "productId": "prod_mug",
        "productName": "Ceramic Travel Mug",
        "sku": "HOM-CT-052",
        "quantity": 3,
        "unitPrice": 34.5,
        "total": 103.5
      },
      {
        "id": "item_1037_2",
        "productId": "prod_bottle",
        "productName": "Insulated Travel Bottle",
        "sku": "HOM-IT-042",
        "quantity": 1,
        "unitPrice": 40,
        "total": 40
      },
      {
        "id": "item_1037_3",
        "productId": "prod_jacket",
        "productName": "Lightweight Field Jacket",
        "sku": "APP-LF-061",
        "quantity": 2,
        "unitPrice": 152.5,
        "total": 305
      }
    ],
    "paymentMethod": "Visa ending in 1846",
    "shippingAddress": {
      "recipient": "James Lewis",
      "line1": "173 Maple Avenue",
      "city": "Portland",
      "state": "OR",
      "postalCode": "97205",
      "country": "United States"
    }
  },
  {
    "id": "order_1036",
    "number": "ORD-1036",
    "customer": {
      "id": "customer_019",
      "name": "Luna Scott",
      "email": "luna.scott@example.com"
    },
    "createdAt": "2026-07-05T14:30:00.000Z",
    "status": "delivered",
    "subtotal": 80,
    "shipping": 8.5,
    "tax": 5.8,
    "discount": 0,
    "total": 94.3,
    "items": [
      {
        "id": "item_1036_1",
        "productId": "prod_backpack",
        "productName": "Everyday Carry Backpack",
        "sku": "BAG-EC-001",
        "quantity": 1,
        "unitPrice": 80,
        "total": 80
      }
    ],
    "paymentMethod": "American Express ending in 1005",
    "shippingAddress": {
      "recipient": "Luna Scott",
      "line1": "174 Cedar Lane",
      "line2": "Apt 2",
      "city": "Raleigh",
      "state": "NC",
      "postalCode": "27601",
      "country": "United States"
    }
  },
  {
    "id": "order_1035",
    "number": "ORD-1035",
    "customer": {
      "id": "customer_026",
      "name": "Mateo Perez",
      "email": "mateo.perez@example.com"
    },
    "createdAt": "2026-07-04T14:30:00.000Z",
    "status": "pending",
    "subtotal": 640,
    "shipping": 12,
    "tax": 46.4,
    "discount": 15,
    "total": 683.4,
    "items": [
      {
        "id": "item_1035_1",
        "productId": "prod_headphones",
        "productName": "Studio Wireless Headphones",
        "sku": "ELC-SW-220",
        "quantity": 2,
        "unitPrice": 126.5,
        "total": 253
      },
      {
        "id": "item_1035_2",
        "productId": "prod_keyboard",
        "productName": "Compact Mechanical Keyboard",
        "sku": "ELC-CM-087",
        "quantity": 3,
        "unitPrice": 129,
        "total": 387
      }
    ],
    "paymentMethod": "Visa ending in 4242",
    "shippingAddress": {
      "recipient": "Mateo Perez",
      "line1": "175 Pine Road",
      "city": "Boston",
      "state": "MA",
      "postalCode": "02108",
      "country": "United States"
    }
  },
  {
    "id": "order_1034",
    "number": "ORD-1034",
    "customer": {
      "id": "customer_003",
      "name": "Sophia Brown",
      "email": "sophia.brown@example.com"
    },
    "createdAt": "2026-07-03T14:30:00.000Z",
    "status": "processing",
    "subtotal": 573.5,
    "shipping": 0,
    "tax": 41.58,
    "discount": 0,
    "total": 615.08,
    "items": [
      {
        "id": "item_1034_1",
        "productId": "prod_sneakers",
        "productName": "Cloudstep Sneakers",
        "sku": "FTW-CS-108",
        "quantity": 3,
        "unitPrice": 98,
        "total": 294
      },
      {
        "id": "item_1034_2",
        "productId": "prod_tote",
        "productName": "Canvas Market Tote",
        "sku": "ACC-CM-025",
        "quantity": 1,
        "unitPrice": 31.5,
        "total": 31.5
      },
      {
        "id": "item_1034_3",
        "productId": "prod_headphones",
        "productName": "Studio Wireless Headphones",
        "sku": "ELC-SW-220",
        "quantity": 2,
        "unitPrice": 124,
        "total": 248
      }
    ],
    "paymentMethod": "Mastercard ending in 8821",
    "shippingAddress": {
      "recipient": "Sophia Brown",
      "line1": "176 Oak Street",
      "city": "Denver",
      "state": "CO",
      "postalCode": "80202",
      "country": "United States"
    }
  },
  {
    "id": "order_1033",
    "number": "ORD-1033",
    "customer": {
      "id": "customer_010",
      "name": "Mason Clark",
      "email": "mason.clark@example.com"
    },
    "createdAt": "2026-07-02T14:30:00.000Z",
    "status": "shipped",
    "subtotal": 50.5,
    "shipping": 5.99,
    "tax": 3.66,
    "discount": 0,
    "total": 60.15,
    "items": [
      {
        "id": "item_1033_1",
        "productId": "prod_wallet",
        "productName": "Slim Leather Wallet",
        "sku": "ACC-SL-033",
        "quantity": 1,
        "unitPrice": 50.5,
        "total": 50.5
      }
    ],
    "paymentMethod": "PayPal",
    "shippingAddress": {
      "recipient": "Mason Clark",
      "line1": "177 Maple Avenue",
      "city": "Brooklyn",
      "state": "NY",
      "postalCode": "11201",
      "country": "United States"
    }
  },
  {
    "id": "order_1032",
    "number": "ORD-1032",
    "customer": {
      "id": "customer_017",
      "name": "Charlotte King",
      "email": "charlotte.king@example.com"
    },
    "createdAt": "2026-07-01T14:30:00.000Z",
    "status": "delivered",
    "subtotal": 562.5,
    "shipping": 8.5,
    "tax": 40.78,
    "discount": 0,
    "total": 611.78,
    "items": [
      {
        "id": "item_1032_1",
        "productId": "prod_jacket",
        "productName": "Lightweight Field Jacket",
        "sku": "APP-LF-061",
        "quantity": 2,
        "unitPrice": 150,
        "total": 300
      },
      {
        "id": "item_1032_2",
        "productId": "prod_sweater",
        "productName": "Merino Crew Sweater",
        "sku": "APP-MC-014",
        "quantity": 3,
        "unitPrice": 87.5,
        "total": 262.5
      }
    ],
    "paymentMethod": "Visa ending in 1846",
    "shippingAddress": {
      "recipient": "Charlotte King",
      "line1": "178 Cedar Lane",
      "city": "Nashville",
      "state": "TN",
      "postalCode": "37201",
      "country": "United States"
    }
  },
  {
    "id": "order_1031",
    "number": "ORD-1031",
    "customer": {
      "id": "customer_024",
      "name": "Sebastian Carter",
      "email": "sebastian.carter@example.com"
    },
    "createdAt": "2026-06-30T14:30:00.000Z",
    "status": "delivered",
    "subtotal": 448.5,
    "shipping": 12,
    "tax": 32.52,
    "discount": 0,
    "total": 493.02,
    "items": [
      {
        "id": "item_1031_1",
        "productId": "prod_mug",
        "productName": "Ceramic Travel Mug",
        "sku": "HOM-CT-052",
        "quantity": 3,
        "unitPrice": 39.5,
        "total": 118.5
      },
      {
        "id": "item_1031_2",
        "productId": "prod_bottle",
        "productName": "Insulated Travel Bottle",
        "sku": "HOM-IT-042",
        "quantity": 1,
        "unitPrice": 35,
        "total": 35
      },
      {
        "id": "item_1031_3",
        "productId": "prod_jacket",
        "productName": "Lightweight Field Jacket",
        "sku": "APP-LF-061",
        "quantity": 2,
        "unitPrice": 147.5,
        "total": 295
      }
    ],
    "paymentMethod": "American Express ending in 1005",
    "shippingAddress": {
      "recipient": "Sebastian Carter",
      "line1": "179 Pine Road",
      "city": "Seattle",
      "state": "WA",
      "postalCode": "98101",
      "country": "United States"
    }
  },
  {
    "id": "order_1030",
    "number": "ORD-1030",
    "customer": {
      "id": "customer_001",
      "name": "Olivia Martin",
      "email": "olivia.martin@example.com"
    },
    "createdAt": "2026-06-29T14:30:00.000Z",
    "status": "processing",
    "subtotal": 75,
    "shipping": 0,
    "tax": 5.44,
    "discount": 7.5,
    "total": 72.94,
    "items": [
      {
        "id": "item_1030_1",
        "productId": "prod_backpack",
        "productName": "Everyday Carry Backpack",
        "sku": "BAG-EC-001",
        "quantity": 1,
        "unitPrice": 75,
        "total": 75
      }
    ],
    "paymentMethod": "Visa ending in 4242",
    "shippingAddress": {
      "recipient": "Olivia Martin",
      "line1": "180 Oak Street",
      "line2": "Apt 8",
      "city": "Austin",
      "state": "TX",
      "postalCode": "78701",
      "country": "United States"
    }
  },
  {
    "id": "order_1029",
    "number": "ORD-1029",
    "customer": {
      "id": "customer_008",
      "name": "Lucas Moore",
      "email": "lucas.moore@example.com"
    },
    "createdAt": "2026-06-28T14:30:00.000Z",
    "status": "shipped",
    "subtotal": 645,
    "shipping": 5.99,
    "tax": 46.76,
    "discount": 0,
    "total": 697.75,
    "items": [
      {
        "id": "item_1029_1",
        "productId": "prod_headphones",
        "productName": "Studio Wireless Headphones",
        "sku": "ELC-SW-220",
        "quantity": 2,
        "unitPrice": 121.5,
        "total": 243
      },
      {
        "id": "item_1029_2",
        "productId": "prod_keyboard",
        "productName": "Compact Mechanical Keyboard",
        "sku": "ELC-CM-087",
        "quantity": 3,
        "unitPrice": 134,
        "total": 402
      }
    ],
    "paymentMethod": "Mastercard ending in 8821",
    "shippingAddress": {
      "recipient": "Lucas Moore",
      "line1": "181 Maple Avenue",
      "city": "San Diego",
      "state": "CA",
      "postalCode": "92101",
      "country": "United States"
    }
  },
  {
    "id": "order_1028",
    "number": "ORD-1028",
    "customer": {
      "id": "customer_015",
      "name": "Evelyn Hall",
      "email": "evelyn.hall@example.com"
    },
    "createdAt": "2026-06-27T14:30:00.000Z",
    "status": "cancelled",
    "subtotal": 583.5,
    "shipping": 8.5,
    "tax": 42.3,
    "discount": 0,
    "total": 634.3,
    "items": [
      {
        "id": "item_1028_1",
        "productId": "prod_sneakers",
        "productName": "Cloudstep Sneakers",
        "sku": "FTW-CS-108",
        "quantity": 3,
        "unitPrice": 103,
        "total": 309
      },
      {
        "id": "item_1028_2",
        "productId": "prod_tote",
        "productName": "Canvas Market Tote",
        "sku": "ACC-CM-025",
        "quantity": 1,
        "unitPrice": 36.5,
        "total": 36.5
      },
      {
        "id": "item_1028_3",
        "productId": "prod_headphones",
        "productName": "Studio Wireless Headphones",
        "sku": "ELC-SW-220",
        "quantity": 2,
        "unitPrice": 119,
        "total": 238
      }
    ],
    "paymentMethod": "PayPal",
    "shippingAddress": {
      "recipient": "Evelyn Hall",
      "line1": "182 Cedar Lane",
      "city": "Chicago",
      "state": "IL",
      "postalCode": "60601",
      "country": "United States"
    }
  },
  {
    "id": "order_1027",
    "number": "ORD-1027",
    "customer": {
      "id": "customer_022",
      "name": "Jack Adams",
      "email": "jack.adams@example.com"
    },
    "createdAt": "2026-06-26T14:30:00.000Z",
    "status": "delivered",
    "subtotal": 55.5,
    "shipping": 12,
    "tax": 4.02,
    "discount": 0,
    "total": 71.52,
    "items": [
      {
        "id": "item_1027_1",
        "productId": "prod_wallet",
        "productName": "Slim Leather Wallet",
        "sku": "ACC-SL-033",
        "quantity": 1,
        "unitPrice": 55.5,
        "total": 55.5
      }
    ],
    "paymentMethod": "Visa ending in 1846",
    "shippingAddress": {
      "recipient": "Jack Adams",
      "line1": "183 Pine Road",
      "city": "Portland",
      "state": "OR",
      "postalCode": "97205",
      "country": "United States"
    }
  },
  {
    "id": "order_1026",
    "number": "ORD-1026",
    "customer": {
      "id": "customer_029",
      "name": "Layla Phillips",
      "email": "layla.phillips@example.com"
    },
    "createdAt": "2026-06-25T14:30:00.000Z",
    "status": "pending",
    "subtotal": 537.5,
    "shipping": 0,
    "tax": 38.97,
    "discount": 0,
    "total": 576.47,
    "items": [
      {
        "id": "item_1026_1",
        "productId": "prod_jacket",
        "productName": "Lightweight Field Jacket",
        "sku": "APP-LF-061",
        "quantity": 2,
        "unitPrice": 145,
        "total": 290
      },
      {
        "id": "item_1026_2",
        "productId": "prod_sweater",
        "productName": "Merino Crew Sweater",
        "sku": "APP-MC-014",
        "quantity": 3,
        "unitPrice": 82.5,
        "total": 247.5
      }
    ],
    "paymentMethod": "American Express ending in 1005",
    "shippingAddress": {
      "recipient": "Layla Phillips",
      "line1": "184 Oak Street",
      "city": "Raleigh",
      "state": "NC",
      "postalCode": "27601",
      "country": "United States"
    }
  },
  {
    "id": "order_1025",
    "number": "ORD-1025",
    "customer": {
      "id": "customer_006",
      "name": "Liam Wilson",
      "email": "liam.wilson@example.com"
    },
    "createdAt": "2026-06-24T14:30:00.000Z",
    "status": "delivered",
    "subtotal": 448.5,
    "shipping": 5.99,
    "tax": 32.52,
    "discount": 15,
    "total": 472.01,
    "items": [
      {
        "id": "item_1025_1",
        "productId": "prod_mug",
        "productName": "Ceramic Travel Mug",
        "sku": "HOM-CT-052",
        "quantity": 3,
        "unitPrice": 34.5,
        "total": 103.5
      },
      {
        "id": "item_1025_2",
        "productId": "prod_bottle",
        "productName": "Insulated Travel Bottle",
        "sku": "HOM-IT-042",
        "quantity": 1,
        "unitPrice": 40,
        "total": 40
      },
      {
        "id": "item_1025_3",
        "productId": "prod_jacket",
        "productName": "Lightweight Field Jacket",
        "sku": "APP-LF-061",
        "quantity": 2,
        "unitPrice": 152.5,
        "total": 305
      }
    ],
    "paymentMethod": "Visa ending in 4242",
    "shippingAddress": {
      "recipient": "Liam Wilson",
      "line1": "185 Maple Avenue",
      "city": "Boston",
      "state": "MA",
      "postalCode": "02108",
      "country": "United States"
    }
  },
  {
    "id": "order_1024",
    "number": "ORD-1024",
    "customer": {
      "id": "customer_013",
      "name": "Harper Walker",
      "email": "harper.walker@example.com"
    },
    "createdAt": "2026-06-23T14:30:00.000Z",
    "status": "shipped",
    "subtotal": 80,
    "shipping": 8.5,
    "tax": 5.8,
    "discount": 0,
    "total": 94.3,
    "items": [
      {
        "id": "item_1024_1",
        "productId": "prod_backpack",
        "productName": "Everyday Carry Backpack",
        "sku": "BAG-EC-001",
        "quantity": 1,
        "unitPrice": 80,
        "total": 80
      }
    ],
    "paymentMethod": "Mastercard ending in 8821",
    "shippingAddress": {
      "recipient": "Harper Walker",
      "line1": "186 Cedar Lane",
      "line2": "Apt 14",
      "city": "Denver",
      "state": "CO",
      "postalCode": "80202",
      "country": "United States"
    }
  },
  {
    "id": "order_1023",
    "number": "ORD-1023",
    "customer": {
      "id": "customer_020",
      "name": "Daniel Green",
      "email": "daniel.green@example.com"
    },
    "createdAt": "2026-06-22T14:30:00.000Z",
    "status": "processing",
    "subtotal": 640,
    "shipping": 12,
    "tax": 46.4,
    "discount": 0,
    "total": 698.4,
    "items": [
      {
        "id": "item_1023_1",
        "productId": "prod_headphones",
        "productName": "Studio Wireless Headphones",
        "sku": "ELC-SW-220",
        "quantity": 2,
        "unitPrice": 126.5,
        "total": 253
      },
      {
        "id": "item_1023_2",
        "productId": "prod_keyboard",
        "productName": "Compact Mechanical Keyboard",
        "sku": "ELC-CM-087",
        "quantity": 3,
        "unitPrice": 129,
        "total": 387
      }
    ],
    "paymentMethod": "PayPal",
    "shippingAddress": {
      "recipient": "Daniel Green",
      "line1": "187 Pine Road",
      "city": "Brooklyn",
      "state": "NY",
      "postalCode": "11201",
      "country": "United States"
    }
  },
  {
    "id": "order_1022",
    "number": "ORD-1022",
    "customer": {
      "id": "customer_027",
      "name": "Chloe Roberts",
      "email": "chloe.roberts@example.com"
    },
    "createdAt": "2026-06-21T14:30:00.000Z",
    "status": "delivered",
    "subtotal": 573.5,
    "shipping": 0,
    "tax": 41.58,
    "discount": 0,
    "total": 615.08,
    "items": [
      {
        "id": "item_1022_1",
        "productId": "prod_sneakers",
        "productName": "Cloudstep Sneakers",
        "sku": "FTW-CS-108",
        "quantity": 3,
        "unitPrice": 98,
        "total": 294
      },
      {
        "id": "item_1022_2",
        "productId": "prod_tote",
        "productName": "Canvas Market Tote",
        "sku": "ACC-CM-025",
        "quantity": 1,
        "unitPrice": 31.5,
        "total": 31.5
      },
      {
        "id": "item_1022_3",
        "productId": "prod_headphones",
        "productName": "Studio Wireless Headphones",
        "sku": "ELC-SW-220",
        "quantity": 2,
        "unitPrice": 124,
        "total": 248
      }
    ],
    "paymentMethod": "Visa ending in 1846",
    "shippingAddress": {
      "recipient": "Chloe Roberts",
      "line1": "188 Oak Street",
      "city": "Nashville",
      "state": "TN",
      "postalCode": "37201",
      "country": "United States"
    }
  },
  {
    "id": "order_1021",
    "number": "ORD-1021",
    "customer": {
      "id": "customer_004",
      "name": "Noah Davis",
      "email": "noah.davis@example.com"
    },
    "createdAt": "2026-06-20T14:30:00.000Z",
    "status": "cancelled",
    "subtotal": 50.5,
    "shipping": 5.99,
    "tax": 3.66,
    "discount": 0,
    "total": 60.15,
    "items": [
      {
        "id": "item_1021_1",
        "productId": "prod_wallet",
        "productName": "Slim Leather Wallet",
        "sku": "ACC-SL-033",
        "quantity": 1,
        "unitPrice": 50.5,
        "total": 50.5
      }
    ],
    "paymentMethod": "American Express ending in 1005",
    "shippingAddress": {
      "recipient": "Noah Davis",
      "line1": "189 Maple Avenue",
      "city": "Seattle",
      "state": "WA",
      "postalCode": "98101",
      "country": "United States"
    }
  },
  {
    "id": "order_1020",
    "number": "ORD-1020",
    "customer": {
      "id": "customer_011",
      "name": "Amelia Harris",
      "email": "amelia.harris@example.com"
    },
    "createdAt": "2026-06-19T14:30:00.000Z",
    "status": "pending",
    "subtotal": 562.5,
    "shipping": 8.5,
    "tax": 40.78,
    "discount": 15,
    "total": 596.78,
    "items": [
      {
        "id": "item_1020_1",
        "productId": "prod_jacket",
        "productName": "Lightweight Field Jacket",
        "sku": "APP-LF-061",
        "quantity": 2,
        "unitPrice": 150,
        "total": 300
      },
      {
        "id": "item_1020_2",
        "productId": "prod_sweater",
        "productName": "Merino Crew Sweater",
        "sku": "APP-MC-014",
        "quantity": 3,
        "unitPrice": 87.5,
        "total": 262.5
      }
    ],
    "paymentMethod": "Visa ending in 4242",
    "shippingAddress": {
      "recipient": "Amelia Harris",
      "line1": "190 Cedar Lane",
      "city": "Austin",
      "state": "TX",
      "postalCode": "78701",
      "country": "United States"
    }
  },
  {
    "id": "order_1019",
    "number": "ORD-1019",
    "customer": {
      "id": "customer_018",
      "name": "Alexander Wright",
      "email": "alexander.wright@example.com"
    },
    "createdAt": "2026-06-18T14:30:00.000Z",
    "status": "refunded",
    "subtotal": 448.5,
    "shipping": 12,
    "tax": 32.52,
    "discount": 0,
    "total": 493.02,
    "items": [
      {
        "id": "item_1019_1",
        "productId": "prod_mug",
        "productName": "Ceramic Travel Mug",
        "sku": "HOM-CT-052",
        "quantity": 3,
        "unitPrice": 39.5,
        "total": 118.5
      },
      {
        "id": "item_1019_2",
        "productId": "prod_bottle",
        "productName": "Insulated Travel Bottle",
        "sku": "HOM-IT-042",
        "quantity": 1,
        "unitPrice": 35,
        "total": 35
      },
      {
        "id": "item_1019_3",
        "productId": "prod_jacket",
        "productName": "Lightweight Field Jacket",
        "sku": "APP-LF-061",
        "quantity": 2,
        "unitPrice": 147.5,
        "total": 295
      }
    ],
    "paymentMethod": "Mastercard ending in 8821",
    "shippingAddress": {
      "recipient": "Alexander Wright",
      "line1": "191 Pine Road",
      "city": "San Diego",
      "state": "CA",
      "postalCode": "92101",
      "country": "United States"
    }
  },
  {
    "id": "order_1018",
    "number": "ORD-1018",
    "customer": {
      "id": "customer_025",
      "name": "Aria Mitchell",
      "email": "aria.mitchell@example.com"
    },
    "createdAt": "2026-06-17T14:30:00.000Z",
    "status": "delivered",
    "subtotal": 75,
    "shipping": 0,
    "tax": 5.44,
    "discount": 0,
    "total": 80.44,
    "items": [
      {
        "id": "item_1018_1",
        "productId": "prod_backpack",
        "productName": "Everyday Carry Backpack",
        "sku": "BAG-EC-001",
        "quantity": 1,
        "unitPrice": 75,
        "total": 75
      }
    ],
    "paymentMethod": "PayPal",
    "shippingAddress": {
      "recipient": "Aria Mitchell",
      "line1": "192 Oak Street",
      "line2": "Apt 2",
      "city": "Chicago",
      "state": "IL",
      "postalCode": "60601",
      "country": "United States"
    }
  },
  {
    "id": "order_1017",
    "number": "ORD-1017",
    "customer": {
      "id": "customer_002",
      "name": "Ethan Williams",
      "email": "ethan.williams@example.com"
    },
    "createdAt": "2026-06-16T14:30:00.000Z",
    "status": "pending",
    "subtotal": 645,
    "shipping": 5.99,
    "tax": 46.76,
    "discount": 0,
    "total": 697.75,
    "items": [
      {
        "id": "item_1017_1",
        "productId": "prod_headphones",
        "productName": "Studio Wireless Headphones",
        "sku": "ELC-SW-220",
        "quantity": 2,
        "unitPrice": 121.5,
        "total": 243
      },
      {
        "id": "item_1017_2",
        "productId": "prod_keyboard",
        "productName": "Compact Mechanical Keyboard",
        "sku": "ELC-CM-087",
        "quantity": 3,
        "unitPrice": 134,
        "total": 402
      }
    ],
    "paymentMethod": "Visa ending in 1846",
    "shippingAddress": {
      "recipient": "Ethan Williams",
      "line1": "193 Maple Avenue",
      "city": "Portland",
      "state": "OR",
      "postalCode": "97205",
      "country": "United States"
    }
  },
  {
    "id": "order_1016",
    "number": "ORD-1016",
    "customer": {
      "id": "customer_009",
      "name": "Isabella Taylor",
      "email": "isabella.taylor@example.com"
    },
    "createdAt": "2026-06-15T14:30:00.000Z",
    "status": "processing",
    "subtotal": 583.5,
    "shipping": 8.5,
    "tax": 42.3,
    "discount": 0,
    "total": 634.3,
    "items": [
      {
        "id": "item_1016_1",
        "productId": "prod_sneakers",
        "productName": "Cloudstep Sneakers",
        "sku": "FTW-CS-108",
        "quantity": 3,
        "unitPrice": 103,
        "total": 309
      },
      {
        "id": "item_1016_2",
        "productId": "prod_tote",
        "productName": "Canvas Market Tote",
        "sku": "ACC-CM-025",
        "quantity": 1,
        "unitPrice": 36.5,
        "total": 36.5
      },
      {
        "id": "item_1016_3",
        "productId": "prod_headphones",
        "productName": "Studio Wireless Headphones",
        "sku": "ELC-SW-220",
        "quantity": 2,
        "unitPrice": 119,
        "total": 238
      }
    ],
    "paymentMethod": "American Express ending in 1005",
    "shippingAddress": {
      "recipient": "Isabella Taylor",
      "line1": "194 Cedar Lane",
      "city": "Raleigh",
      "state": "NC",
      "postalCode": "27601",
      "country": "United States"
    }
  },
  {
    "id": "order_1015",
    "number": "ORD-1015",
    "customer": {
      "id": "customer_016",
      "name": "Benjamin Allen",
      "email": "benjamin.allen@example.com"
    },
    "createdAt": "2026-06-14T14:30:00.000Z",
    "status": "shipped",
    "subtotal": 55.5,
    "shipping": 12,
    "tax": 4.02,
    "discount": 5.55,
    "total": 65.97,
    "items": [
      {
        "id": "item_1015_1",
        "productId": "prod_wallet",
        "productName": "Slim Leather Wallet",
        "sku": "ACC-SL-033",
        "quantity": 1,
        "unitPrice": 55.5,
        "total": 55.5
      }
    ],
    "paymentMethod": "Visa ending in 4242",
    "shippingAddress": {
      "recipient": "Benjamin Allen",
      "line1": "195 Pine Road",
      "city": "Boston",
      "state": "MA",
      "postalCode": "02108",
      "country": "United States"
    }
  },
  {
    "id": "order_1014",
    "number": "ORD-1014",
    "customer": {
      "id": "customer_023",
      "name": "Sofia Nelson",
      "email": "sofia.nelson@example.com"
    },
    "createdAt": "2026-06-13T14:30:00.000Z",
    "status": "delivered",
    "subtotal": 537.5,
    "shipping": 0,
    "tax": 38.97,
    "discount": 0,
    "total": 576.47,
    "items": [
      {
        "id": "item_1014_1",
        "productId": "prod_jacket",
        "productName": "Lightweight Field Jacket",
        "sku": "APP-LF-061",
        "quantity": 2,
        "unitPrice": 145,
        "total": 290
      },
      {
        "id": "item_1014_2",
        "productId": "prod_sweater",
        "productName": "Merino Crew Sweater",
        "sku": "APP-MC-014",
        "quantity": 3,
        "unitPrice": 82.5,
        "total": 247.5
      }
    ],
    "paymentMethod": "Mastercard ending in 8821",
    "shippingAddress": {
      "recipient": "Sofia Nelson",
      "line1": "196 Oak Street",
      "city": "Denver",
      "state": "CO",
      "postalCode": "80202",
      "country": "United States"
    }
  },
  {
    "id": "order_1013",
    "number": "ORD-1013",
    "customer": {
      "id": "customer_030",
      "name": "Leo Campbell",
      "email": "leo.campbell@example.com"
    },
    "createdAt": "2026-06-12T14:30:00.000Z",
    "status": "delivered",
    "subtotal": 448.5,
    "shipping": 5.99,
    "tax": 32.52,
    "discount": 0,
    "total": 487.01,
    "items": [
      {
        "id": "item_1013_1",
        "productId": "prod_mug",
        "productName": "Ceramic Travel Mug",
        "sku": "HOM-CT-052",
        "quantity": 3,
        "unitPrice": 34.5,
        "total": 103.5
      },
      {
        "id": "item_1013_2",
        "productId": "prod_bottle",
        "productName": "Insulated Travel Bottle",
        "sku": "HOM-IT-042",
        "quantity": 1,
        "unitPrice": 40,
        "total": 40
      },
      {
        "id": "item_1013_3",
        "productId": "prod_jacket",
        "productName": "Lightweight Field Jacket",
        "sku": "APP-LF-061",
        "quantity": 2,
        "unitPrice": 152.5,
        "total": 305
      }
    ],
    "paymentMethod": "PayPal",
    "shippingAddress": {
      "recipient": "Leo Campbell",
      "line1": "197 Maple Avenue",
      "city": "Brooklyn",
      "state": "NY",
      "postalCode": "11201",
      "country": "United States"
    }
  },
  {
    "id": "order_1012",
    "number": "ORD-1012",
    "customer": {
      "id": "customer_007",
      "name": "Ava Thompson",
      "email": "ava.thompson@example.com"
    },
    "createdAt": "2026-06-11T14:30:00.000Z",
    "status": "processing",
    "subtotal": 80,
    "shipping": 8.5,
    "tax": 5.8,
    "discount": 0,
    "total": 94.3,
    "items": [
      {
        "id": "item_1012_1",
        "productId": "prod_backpack",
        "productName": "Everyday Carry Backpack",
        "sku": "BAG-EC-001",
        "quantity": 1,
        "unitPrice": 80,
        "total": 80
      }
    ],
    "paymentMethod": "Visa ending in 1846",
    "shippingAddress": {
      "recipient": "Ava Thompson",
      "line1": "198 Cedar Lane",
      "line2": "Apt 8",
      "city": "Nashville",
      "state": "TN",
      "postalCode": "37201",
      "country": "United States"
    }
  },
  {
    "id": "order_1011",
    "number": "ORD-1011",
    "customer": {
      "id": "customer_014",
      "name": "Henry Young",
      "email": "henry.young@example.com"
    },
    "createdAt": "2026-06-10T14:30:00.000Z",
    "status": "shipped",
    "subtotal": 640,
    "shipping": 12,
    "tax": 46.4,
    "discount": 0,
    "total": 698.4,
    "items": [
      {
        "id": "item_1011_1",
        "productId": "prod_headphones",
        "productName": "Studio Wireless Headphones",
        "sku": "ELC-SW-220",
        "quantity": 2,
        "unitPrice": 126.5,
        "total": 253
      },
      {
        "id": "item_1011_2",
        "productId": "prod_keyboard",
        "productName": "Compact Mechanical Keyboard",
        "sku": "ELC-CM-087",
        "quantity": 3,
        "unitPrice": 129,
        "total": 387
      }
    ],
    "paymentMethod": "American Express ending in 1005",
    "shippingAddress": {
      "recipient": "Henry Young",
      "line1": "199 Pine Road",
      "city": "Seattle",
      "state": "WA",
      "postalCode": "98101",
      "country": "United States"
    }
  },
  {
    "id": "order_1010",
    "number": "ORD-1010",
    "customer": {
      "id": "customer_021",
      "name": "Camila Baker",
      "email": "camila.baker@example.com"
    },
    "createdAt": "2026-06-09T14:30:00.000Z",
    "status": "cancelled",
    "subtotal": 573.5,
    "shipping": 0,
    "tax": 41.58,
    "discount": 15,
    "total": 600.08,
    "items": [
      {
        "id": "item_1010_1",
        "productId": "prod_sneakers",
        "productName": "Cloudstep Sneakers",
        "sku": "FTW-CS-108",
        "quantity": 3,
        "unitPrice": 98,
        "total": 294
      },
      {
        "id": "item_1010_2",
        "productId": "prod_tote",
        "productName": "Canvas Market Tote",
        "sku": "ACC-CM-025",
        "quantity": 1,
        "unitPrice": 31.5,
        "total": 31.5
      },
      {
        "id": "item_1010_3",
        "productId": "prod_headphones",
        "productName": "Studio Wireless Headphones",
        "sku": "ELC-SW-220",
        "quantity": 2,
        "unitPrice": 124,
        "total": 248
      }
    ],
    "paymentMethod": "Visa ending in 4242",
    "shippingAddress": {
      "recipient": "Camila Baker",
      "line1": "200 Oak Street",
      "city": "Austin",
      "state": "TX",
      "postalCode": "78701",
      "country": "United States"
    }
  },
  {
    "id": "order_1009",
    "number": "ORD-1009",
    "customer": {
      "id": "customer_028",
      "name": "Samuel Turner",
      "email": "samuel.turner@example.com"
    },
    "createdAt": "2026-06-08T14:30:00.000Z",
    "status": "delivered",
    "subtotal": 50.5,
    "shipping": 5.99,
    "tax": 3.66,
    "discount": 0,
    "total": 60.15,
    "items": [
      {
        "id": "item_1009_1",
        "productId": "prod_wallet",
        "productName": "Slim Leather Wallet",
        "sku": "ACC-SL-033",
        "quantity": 1,
        "unitPrice": 50.5,
        "total": 50.5
      }
    ],
    "paymentMethod": "Mastercard ending in 8821",
    "shippingAddress": {
      "recipient": "Samuel Turner",
      "line1": "201 Maple Avenue",
      "city": "San Diego",
      "state": "CA",
      "postalCode": "92101",
      "country": "United States"
    }
  },
  {
    "id": "order_1008",
    "number": "ORD-1008",
    "customer": {
      "id": "customer_005",
      "name": "Mia Anderson",
      "email": "mia.anderson@example.com"
    },
    "createdAt": "2026-06-07T14:30:00.000Z",
    "status": "pending",
    "subtotal": 562.5,
    "shipping": 8.5,
    "tax": 40.78,
    "discount": 0,
    "total": 611.78,
    "items": [
      {
        "id": "item_1008_1",
        "productId": "prod_jacket",
        "productName": "Lightweight Field Jacket",
        "sku": "APP-LF-061",
        "quantity": 2,
        "unitPrice": 150,
        "total": 300
      },
      {
        "id": "item_1008_2",
        "productId": "prod_sweater",
        "productName": "Merino Crew Sweater",
        "sku": "APP-MC-014",
        "quantity": 3,
        "unitPrice": 87.5,
        "total": 262.5
      }
    ],
    "paymentMethod": "PayPal",
    "shippingAddress": {
      "recipient": "Mia Anderson",
      "line1": "202 Cedar Lane",
      "city": "Chicago",
      "state": "IL",
      "postalCode": "60601",
      "country": "United States"
    }
  },
  {
    "id": "order_1007",
    "number": "ORD-1007",
    "customer": {
      "id": "customer_012",
      "name": "James Lewis",
      "email": "james.lewis@example.com"
    },
    "createdAt": "2026-06-06T14:30:00.000Z",
    "status": "delivered",
    "subtotal": 448.5,
    "shipping": 12,
    "tax": 32.52,
    "discount": 0,
    "total": 493.02,
    "items": [
      {
        "id": "item_1007_1",
        "productId": "prod_mug",
        "productName": "Ceramic Travel Mug",
        "sku": "HOM-CT-052",
        "quantity": 3,
        "unitPrice": 39.5,
        "total": 118.5
      },
      {
        "id": "item_1007_2",
        "productId": "prod_bottle",
        "productName": "Insulated Travel Bottle",
        "sku": "HOM-IT-042",
        "quantity": 1,
        "unitPrice": 35,
        "total": 35
      },
      {
        "id": "item_1007_3",
        "productId": "prod_jacket",
        "productName": "Lightweight Field Jacket",
        "sku": "APP-LF-061",
        "quantity": 2,
        "unitPrice": 147.5,
        "total": 295
      }
    ],
    "paymentMethod": "Visa ending in 1846",
    "shippingAddress": {
      "recipient": "James Lewis",
      "line1": "203 Pine Road",
      "city": "Portland",
      "state": "OR",
      "postalCode": "97205",
      "country": "United States"
    }
  },
  {
    "id": "order_1006",
    "number": "ORD-1006",
    "customer": {
      "id": "customer_019",
      "name": "Luna Scott",
      "email": "luna.scott@example.com"
    },
    "createdAt": "2026-06-05T14:30:00.000Z",
    "status": "shipped",
    "subtotal": 75,
    "shipping": 0,
    "tax": 5.44,
    "discount": 0,
    "total": 80.44,
    "items": [
      {
        "id": "item_1006_1",
        "productId": "prod_backpack",
        "productName": "Everyday Carry Backpack",
        "sku": "BAG-EC-001",
        "quantity": 1,
        "unitPrice": 75,
        "total": 75
      }
    ],
    "paymentMethod": "American Express ending in 1005",
    "shippingAddress": {
      "recipient": "Luna Scott",
      "line1": "204 Oak Street",
      "line2": "Apt 14",
      "city": "Raleigh",
      "state": "NC",
      "postalCode": "27601",
      "country": "United States"
    }
  },
  {
    "id": "order_1005",
    "number": "ORD-1005",
    "customer": {
      "id": "customer_026",
      "name": "Mateo Perez",
      "email": "mateo.perez@example.com"
    },
    "createdAt": "2026-06-04T14:30:00.000Z",
    "status": "processing",
    "subtotal": 645,
    "shipping": 5.99,
    "tax": 46.76,
    "discount": 15,
    "total": 682.75,
    "items": [
      {
        "id": "item_1005_1",
        "productId": "prod_headphones",
        "productName": "Studio Wireless Headphones",
        "sku": "ELC-SW-220",
        "quantity": 2,
        "unitPrice": 121.5,
        "total": 243
      },
      {
        "id": "item_1005_2",
        "productId": "prod_keyboard",
        "productName": "Compact Mechanical Keyboard",
        "sku": "ELC-CM-087",
        "quantity": 3,
        "unitPrice": 134,
        "total": 402
      }
    ],
    "paymentMethod": "Visa ending in 4242",
    "shippingAddress": {
      "recipient": "Mateo Perez",
      "line1": "205 Maple Avenue",
      "city": "Boston",
      "state": "MA",
      "postalCode": "02108",
      "country": "United States"
    }
  },
  {
    "id": "order_1004",
    "number": "ORD-1004",
    "customer": {
      "id": "customer_003",
      "name": "Sophia Brown",
      "email": "sophia.brown@example.com"
    },
    "createdAt": "2026-06-03T14:30:00.000Z",
    "status": "delivered",
    "subtotal": 583.5,
    "shipping": 8.5,
    "tax": 42.3,
    "discount": 0,
    "total": 634.3,
    "items": [
      {
        "id": "item_1004_1",
        "productId": "prod_sneakers",
        "productName": "Cloudstep Sneakers",
        "sku": "FTW-CS-108",
        "quantity": 3,
        "unitPrice": 103,
        "total": 309
      },
      {
        "id": "item_1004_2",
        "productId": "prod_tote",
        "productName": "Canvas Market Tote",
        "sku": "ACC-CM-025",
        "quantity": 1,
        "unitPrice": 36.5,
        "total": 36.5
      },
      {
        "id": "item_1004_3",
        "productId": "prod_headphones",
        "productName": "Studio Wireless Headphones",
        "sku": "ELC-SW-220",
        "quantity": 2,
        "unitPrice": 119,
        "total": 238
      }
    ],
    "paymentMethod": "Mastercard ending in 8821",
    "shippingAddress": {
      "recipient": "Sophia Brown",
      "line1": "206 Cedar Lane",
      "city": "Denver",
      "state": "CO",
      "postalCode": "80202",
      "country": "United States"
    }
  },
  {
    "id": "order_1003",
    "number": "ORD-1003",
    "customer": {
      "id": "customer_010",
      "name": "Mason Clark",
      "email": "mason.clark@example.com"
    },
    "createdAt": "2026-06-02T14:30:00.000Z",
    "status": "cancelled",
    "subtotal": 55.5,
    "shipping": 12,
    "tax": 4.02,
    "discount": 0,
    "total": 71.52,
    "items": [
      {
        "id": "item_1003_1",
        "productId": "prod_wallet",
        "productName": "Slim Leather Wallet",
        "sku": "ACC-SL-033",
        "quantity": 1,
        "unitPrice": 55.5,
        "total": 55.5
      }
    ],
    "paymentMethod": "PayPal",
    "shippingAddress": {
      "recipient": "Mason Clark",
      "line1": "207 Pine Road",
      "city": "Brooklyn",
      "state": "NY",
      "postalCode": "11201",
      "country": "United States"
    }
  },
  {
    "id": "order_1002",
    "number": "ORD-1002",
    "customer": {
      "id": "customer_017",
      "name": "Charlotte King",
      "email": "charlotte.king@example.com"
    },
    "createdAt": "2026-06-01T14:30:00.000Z",
    "status": "pending",
    "subtotal": 537.5,
    "shipping": 0,
    "tax": 38.97,
    "discount": 0,
    "total": 576.47,
    "items": [
      {
        "id": "item_1002_1",
        "productId": "prod_jacket",
        "productName": "Lightweight Field Jacket",
        "sku": "APP-LF-061",
        "quantity": 2,
        "unitPrice": 145,
        "total": 290
      },
      {
        "id": "item_1002_2",
        "productId": "prod_sweater",
        "productName": "Merino Crew Sweater",
        "sku": "APP-MC-014",
        "quantity": 3,
        "unitPrice": 82.5,
        "total": 247.5
      }
    ],
    "paymentMethod": "Visa ending in 1846",
    "shippingAddress": {
      "recipient": "Charlotte King",
      "line1": "208 Oak Street",
      "city": "Nashville",
      "state": "TN",
      "postalCode": "37201",
      "country": "United States"
    }
  },
  {
    "id": "order_1001",
    "number": "ORD-1001",
    "customer": {
      "id": "customer_024",
      "name": "Sebastian Carter",
      "email": "sebastian.carter@example.com"
    },
    "createdAt": "2026-06-01T09:15:00.000Z",
    "status": "refunded",
    "subtotal": 448.5,
    "shipping": 5.99,
    "tax": 32.52,
    "discount": 0,
    "total": 487.01,
    "items": [
      {
        "id": "item_1001_1",
        "productId": "prod_mug",
        "productName": "Ceramic Travel Mug",
        "sku": "HOM-CT-052",
        "quantity": 3,
        "unitPrice": 34.5,
        "total": 103.5
      },
      {
        "id": "item_1001_2",
        "productId": "prod_bottle",
        "productName": "Insulated Travel Bottle",
        "sku": "HOM-IT-042",
        "quantity": 1,
        "unitPrice": 40,
        "total": 40
      },
      {
        "id": "item_1001_3",
        "productId": "prod_jacket",
        "productName": "Lightweight Field Jacket",
        "sku": "APP-LF-061",
        "quantity": 2,
        "unitPrice": 152.5,
        "total": 305
      }
    ],
    "paymentMethod": "American Express ending in 1005",
    "shippingAddress": {
      "recipient": "Sebastian Carter",
      "line1": "209 Maple Avenue",
      "city": "Seattle",
      "state": "WA",
      "postalCode": "98101",
      "country": "United States"
    }
  }
];
