-- CreateEnum
CREATE TYPE "FileFormat" AS ENUM ('PDF', 'DJVU');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "additional_info" TEXT,
    "fk_user_role_id" INTEGER NOT NULL,
    "is_confirmed" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resources" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "fk_category_id" INTEGER NOT NULL,
    "publication_date" TIMESTAMP(3) NOT NULL,
    "authors" TEXT[],
    "keywords" TEXT[],
    "file_name" TEXT NOT NULL,
    "file_format" "FileFormat" NOT NULL,
    "file_size" TEXT NOT NULL,
    "preview_image_name" TEXT,
    "preview_image_url" TEXT,
    "citation" TEXT,
    "additional_info" JSONB NOT NULL,
    "fk_resource_type_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fk_uploaded_by_user_id" INTEGER NOT NULL,

    CONSTRAINT "resources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resource_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "resource_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saved_resources" (
    "fk_resource_id" INTEGER NOT NULL,
    "fk_user_id" INTEGER NOT NULL,

    CONSTRAINT "saved_resources_pkey" PRIMARY KEY ("fk_user_id","fk_resource_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "saved_resources_fk_user_id_fk_resource_id_key" ON "saved_resources"("fk_user_id", "fk_resource_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_fk_user_role_id_fkey" FOREIGN KEY ("fk_user_role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resources" ADD CONSTRAINT "resources_fk_category_id_fkey" FOREIGN KEY ("fk_category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resources" ADD CONSTRAINT "resources_fk_resource_type_id_fkey" FOREIGN KEY ("fk_resource_type_id") REFERENCES "resource_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resources" ADD CONSTRAINT "resources_fk_uploaded_by_user_id_fkey" FOREIGN KEY ("fk_uploaded_by_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_resources" ADD CONSTRAINT "saved_resources_fk_resource_id_fkey" FOREIGN KEY ("fk_resource_id") REFERENCES "resources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_resources" ADD CONSTRAINT "saved_resources_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

INSERT INTO roles (name) VALUES ('admin'), ('editor'), ('user');

INSERT INTO resource_types (name) VALUES
('Книга'),
('Стаття'),
('Методичні матеріали'),
('Посібник'),
('Конференційний матеріал'),
('Дисертація'),
('Реферат'),
('Звіт');

INSERT INTO categories ("name") VALUES
('Алгоритми'),
('Системне програмування'),
('Мережеві технології'),
('Бази даних'),
('Штучний інтелект'),
('Інформаційна безпека'),
('Вбудовані системи'),
('Розподілені системи'),
('Фізика'),
('Квантова фізика'),
('Вища математика'),
('Електроніка'),
('Радіофізика'),
('Комп''ютерні системи');
