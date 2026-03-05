# ☕ Mini Café Dessert API

ระบบ Backend สำหรับ Mini Café Dessert API

## 🔐 Authentication

| Method | Endpoint         | Description | Role   |
| ------ | ---------------- | ----------- | ------ |
| POST   | `/auth/register` | สมัครสมาชิก | Public |
| POST   | `/auth/login`    | เข้าสู่ระบบ | Public |

---

## 👤 User

| Method | Endpoint    | Description       | Role |
| ------ | ----------- | ----------------- | ---- |
| GET    | `/users/me` | ดูข้อมูลตัวเอง    | User |
| PUT    | `/users/me` | แก้ไขข้อมูลตัวเอง | User |

---

## 🍰 Desserts (เมนูขนม)

| Method | Endpoint        | Description      | Role  |
| ------ | --------------- | ---------------- | ----- |
| GET    | `/desserts`     | ดูเมนูขนมทั้งหมด | User  |
| POST   | `/desserts`     | เพิ่มเมนูขนม     | Admin |
| DELETE | `/desserts/:id` | ลบเมนูขนม        | Admin |

---

## ⭐ Reviews

| Method | Endpoint       | Description      | Role |
| ------ | -------------- | ---------------- | ---- |
| POST   | `/reviews`     | รีวิวขนม         | User |
| GET    | `/reviews/my`  | ดูรีวิวของตัวเอง | User |
| DELETE | `/reviews/:id` | ลบรีวิวของตัวเอง | User |

# 📊 ER Diagram – Mini Café Dessert API

![erd](./prisma-erd.svg)

## Prisma Models

### Role Enum

```prisma
enum Role {
  USER
  ADMIN
}
```

---

### User Model

```prisma
model User {
  id        Int      @id @default(autoincrement())
  username  String
  email     String   @unique
  password  String
  role      Role     @default(USER)

  reviews   Review[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

### Dessert Model

```prisma
model Dessert {
  id        Int      @id @default(autoincrement())
  name      String
  price     Float
  category  String

  reviews   Review[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

### Review Model

```prisma
model Review {
  id        Int      @id @default(autoincrement())
  rating    Int
  comment   String

  userId    Int
  dessertId Int

  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  dessert   Dessert  @relation(fields: [dessertId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([userId, dessertId]) // ป้องกัน user รีวิวเมนูเดิมซ้ำ
}
```


# 🔐 Authentication

---

## POST `/auth/register`

สมัครสมาชิก

### Request Body

```json
{
  "username": "pan",
  "email": "pan@email.com",
  "password": "123456",
  "role": "USER"
}
```

> role มีค่า: `USER` หรือ `ADMIN` (default = USER)

---

### Success Response (201)

```json
{
  "message": "Register success",
  "user": {
    "id": 1,
    "username": "pan",
    "email": "pan@email.com",
    "role": "USER"
  }
}
```

---

### Error Response (400)

```json
{
  "status": "error",
  "message": "Email already exists"
}
```

---

## POST `/auth/login`

เข้าสู่ระบบ

### Request Body

```json
{
  "email": "pan@email.com",
  "password": "123456"
}
```

---

### Success Response (200)

```json
{
  "message": "Login success",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "username": "pan",
    "role": "USER"
  }
}
```

---

### Error Response (401)

```json
{
  "status": "error",
  "message": "Invalid credentials"
}
```

---

# 👤 Users

> ทุก endpoint ต้องแนบ Header

```
Authorization: Bearer <token>
```

---

## GET `/users/me`

ดูข้อมูลตัวเอง

### Success Response (200)

```json
{
  "id": 1,
  "username": "pan",
  "email": "pan@email.com",
  "role": "USER"
}
```

---

## PUT `/users/me`

แก้ไขข้อมูลตัวเอง

### Request Body

```json
{
  "username": "pan_new",
  "password": "newpassword123"
}
```

---

### Success Response (200)

```json
{
  "message": "Profile updated"
}
```

---

### Error Response (401)

```json
{
  "status": "error",
  "message": "Unauthorized"
}
```

---

# 🍰 Desserts

---

## GET `/desserts`

ดูเมนูขนมทั้งหมด  
Role: USER / ADMIN

### Success Response (200)

```json
[
  {
    "id": 1,
    "name": "Chocolate Cake",
    "price": 120,
    "category": "cake"
  },
  {
    "id": 2,
    "name": "Strawberry Cheesecake",
    "price": 150,
    "category": "cake"
  }
]
```

---

## POST `/desserts`

เพิ่มเมนูขนม  
Role: ADMIN

### Request Body

```json
{
  "name": "Matcha Cake",
  "price": 140,
  "category": "cake"
}
```

---

### Success Response (201)

```json
{
  "message": "Dessert created",
  "dessert": {
    "id": 3,
    "name": "Matcha Cake",
    "price": 140,
    "category": "cake"
  }
}
```

---

### Error Response (403)

```json
{
  "status": "error",
  "message": "Forbidden: Admin only"
}
```

---

## DELETE `/desserts/:id`

ลบเมนูขนม  
Role: ADMIN

### Success Response (200)

```json
{
  "message": "Dessert deleted"
}
```

---

### Error Response (404)

```json
{
  "status": "error",
  "message": "Dessert not found"
}
```

---

# ⭐ Reviews

---

## POST `/reviews`

รีวิวขนม  
Role: USER

### Request Body

```json
{
  "rating": 5,
  "comment": "อร่อยมาก",
  "dessertId": 1
}
```

---

### Success Response (201)

```json
{
  "message": "Review created",
  "review": {
    "id": 1,
    "rating": 5,
    "comment": "อร่อยมาก",
    "userId": 1,
    "dessertId": 1
  }
}
```

---

### Error Responses

**401 Unauthorized**

```json
{
  "status": "error",
  "message": "Unauthorized"
}
```

**400 Dessert not found**

```json
{
  "status": "error",
  "message": "Dessert not found"
}
```

---

## GET `/reviews/my`

ดูรีวิวของตัวเอง

### Success Response (200)

```json
[
  {
    "id": 1,
    "rating": 5,
    "comment": "อร่อยมาก",
    "dessertId": 1
  }
]
```

---

## DELETE `/reviews/:id`

ลบรีวิวของตัวเอง

### Success Response (200)

```json
{
  "message": "Review deleted"
}
```

---

### Error Response (403 - Not Owner)

```json
{
  "status": "error",
  "message": "Forbidden: You can delete only your review"
}
```

---

# 🔒 Business Rules

- ต้อง login ก่อนรีวิว
- User ลบได้เฉพาะ review ของตัวเอง
- Admin เท่านั้นที่เพิ่ม / ลบเมนูขนมได้
- 1 Dessert มีหลาย Review ได้
- (Optional) 1 User ควรรีวิว 1 Dessert ได้แค่ 1 ครั้ง

---