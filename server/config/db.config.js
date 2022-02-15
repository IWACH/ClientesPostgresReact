module.exports = {
  HOST: "localhost",
  USER: "admin",
  PASSWORD: "admin",
  DB: "clientes",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
// module.exports = {
//   HOST: "ec2-34-224-239-147.compute-1.amazonaws.com",
//   USER: "obqpfsatdlbcwl",
//   PASSWORD: "4852c97a5dcbf5b3bfa538e97566d78ee7f1e35724ac80fd41652c8050479d99",
//   DB: "d94nehherng3rm",
//   dialect: "postgres",
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// };
