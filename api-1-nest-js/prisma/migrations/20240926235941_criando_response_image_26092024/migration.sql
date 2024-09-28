-- CreateTable
CREATE TABLE "ResponseImage" (
    "id" SERIAL NOT NULL,
    "marca" TEXT,
    "dataHora" TIMESTAMP(3) NOT NULL,
    "buffer" BYTEA NOT NULL,

    CONSTRAINT "ResponseImage_pkey" PRIMARY KEY ("id")
);
