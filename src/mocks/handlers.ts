import { rest } from 'msw';

const handlers = [
  rest.get('/scoops', (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json([
        { name: 'Chocolate', imagePath: '/images/chocolate.png' },
        { name: 'Vanilla', imagePath: '/images/vanilla.png' },
      ])
    )
  ),

  rest.get('/toppings', (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json([
        { name: 'Cherries', imagePath: '/images/cherries.png' },
        { name: 'M&Ms', imagePath: '/images/m-and-ms.png' },
        { name: 'Hot fudge', imagePath: '/images/hot-fudge.png' },
      ])
    )
  ),

  rest.post('/order', (req, res, ctx) => res(ctx.json({ orderNumber: 123455676 }))),
];

export default handlers;
