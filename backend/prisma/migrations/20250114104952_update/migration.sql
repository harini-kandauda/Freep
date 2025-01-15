-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT,
    "email" TEXT,
    "password" TEXT,
    "avatar_url" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clothing" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "user_id" INTEGER NOT NULL,
    "description" TEXT,

    CONSTRAINT "Clothing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Picture" (
    "id" SERIAL NOT NULL,
    "url" TEXT,
    "clothing_id" INTEGER NOT NULL,

    CONSTRAINT "Picture_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Clothing" ADD CONSTRAINT "Clothing_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Picture" ADD CONSTRAINT "Picture_clothing_id_fkey" FOREIGN KEY ("clothing_id") REFERENCES "Clothing"("id") ON DELETE CASCADE ON UPDATE CASCADE;
