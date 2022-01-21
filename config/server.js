module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', "http://localhost:1337"),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '343f2a66c3687450cca5b594e01c00c4'),
    },
  },
});
