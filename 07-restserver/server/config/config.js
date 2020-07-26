//========================
// Puerto
//==========================
process.env.PORT = process.env.PORT || 3000;

//========================
// Vencimiento del Token
//==========================
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//========================
// SEED de autenticacion
//==========================
process.env.SEED = process.env.SEED || "este-es-el-seed-produccion";

//========================
// CLIENT_ID Google
//==========================
process.env.CLIENT_ID =
    "1097019238508-rnsd86e2bkemkomr8ug9ifd9te962pj1.apps.googleusercontent.com";