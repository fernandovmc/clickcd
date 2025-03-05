-- CreateTable
CREATE TABLE "centrodistribuicao" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "localizacao" VARCHAR(255) NOT NULL,
    "metragem" INTEGER NOT NULL,
    "disponibilidade" BOOLEAN NOT NULL,
    "createdat" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "centrodistribuicao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "industria" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "localizacao" VARCHAR(255) NOT NULL,
    "capacidade_producao" INTEGER NOT NULL,
    "createdat" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "industria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedidos" (
    "id" SERIAL NOT NULL,
    "usuarioid" INTEGER NOT NULL,
    "tipo" VARCHAR(50) NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "detalhes" TEXT,
    "createdat" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "planos" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "recursos" TEXT NOT NULL,
    "preco" DECIMAL(10,2) NOT NULL,
    "createdat" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "planos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transportadora" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "veiculos" INTEGER NOT NULL,
    "carga_maxima" INTEGER NOT NULL,
    "localizacao" VARCHAR(255) NOT NULL,
    "createdat" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transportadora_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "tipo_usuario" VARCHAR(50) NOT NULL,
    "plano" VARCHAR(50) NOT NULL,
    "whatsapp" VARCHAR(20),
    "createdat" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_usuarioid_fkey" FOREIGN KEY ("usuarioid") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
