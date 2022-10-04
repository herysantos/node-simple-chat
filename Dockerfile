FROM node:16-slim AS base

ENV APP_DIR /usr/app
WORKDIR $APP_DIR

RUN addgroup --gid 1001 --system app && \
    adduser --uid 1001 --system --gid 1001 app
RUN chown -R app:app $APP_DIR

COPY --chown=app:app . $APP_DIR

USER app

RUN yarn install

CMD ["yarn", "start"]
