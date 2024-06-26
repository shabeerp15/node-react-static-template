FROM oven/bun:1


WORKDIR /app
COPY . .
RUN bun install
RUN cd client && bun install && bun run build

ARG PORT
EXPOSE ${PORT:-3000}

CMD ["bun", "start"]