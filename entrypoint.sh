#!/bin/sh

echo "Esperando o banco ficar online..."

until nc -z db 5432; do
  echo "Ainda não subiu, tentando de novo..."
  sleep 2
done

if [ "$NODE_ENV" = "production" ]; then
  echo "Rodando migrations (produção)..."
  npx prisma migrate deploy
else
  echo "Rodando migrations (dev)..."
  npx prisma migrate dev
  npx prisma db seed
fi

echo "Banco ok. Subindo o app."
exec npm run start:prod
