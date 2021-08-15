/* eslint-disable @typescript-eslint/no-explicit-any */
import { rest, setupWorker } from 'msw'
import { DefaultRequestBody, RequestParams, RestRequest } from 'msw'
import { GET } from './api'

// Cypress and msw should use the same routes and handlers. We cannot just leave msw due to problems with cypress ct https://github.com/mswjs/msw/issues/744
export const FAPI = {
  GET: `${GET}*`,
  get: (url: string) => ({ userId: urlId(url), title: 'mock title' }),
}

type WR = RestRequest<DefaultRequestBody, RequestParams>
type JSObject = { [key: string]: any }

const w = (f: (r: WR) => JSObject) => (req: any, res: any, ctx: any) => res(ctx.json(f(req)))
const urlId = (url: string) => url.split('/').slice(-1)[0]

const handlers = [
  rest.get(
    FAPI.GET,
    w((r) => FAPI.get(r.url.toString())),
  ),
]

export const startWorker = () => {
  const worker = setupWorker(...handlers)
  return worker.start()
}
