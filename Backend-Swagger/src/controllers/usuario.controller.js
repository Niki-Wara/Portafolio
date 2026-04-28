const prisma = require("../config/prisma");

const getUsuarios = async (req, res, next) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      where: {
        activo: true,
      },
      select: {
        id: true,
        nombre: true,
        email: true,
        activo: true,
        createAt: true,
      },
    });

    res.json(usuarios);
  } catch (error) {
    next(error);
  }
};
const getUsuarioById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const usuario = await prisma.usuario.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        nombre: true,
        email: true,
        activo: true,
        createAt: true,
      },
    });

    if (!usuario) {
      return res
        .status(404)
        .json({ message: "Usuario no encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    next(error);
  }
};

const createUsuario = async (req, res, next) => {
  try {
    const {
      nombre,
      email,
      password,
      activo = true,
    } = req.body;

    const existe = await prisma.usuario.findUnique({
      where: { email },
    });

    if (existe) {
      return res.status(400).json({
        message: "El email ya está en uso",
      });
    }

    const nuevoUsuario =
      await prisma.usuario.create({
        data: {
          nombre,
          email,
          password,
          activo,
        },
        select: {
          id: true,
          nombre: true,
          email: true,
          activo: true,
          createAt: true,
        },
      });

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    next(error);
  }
};

const updateUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      nombre,
      email,
      password,
      activo,
    } = req.body;

    const data = {};

    if (nombre !== undefined)
      data.nombre = nombre;

    if (email !== undefined)
      data.email = email;

    if (password !== undefined)
      data.password = password;

    if (activo !== undefined)
      data.activo = activo;

    const usuario =
      await prisma.usuario.update({
        where: {
          id: Number(id),
        },
        data,
        select: {
          id: true,
          nombre: true,
          email: true,
          activo: true,
          createAt: true,
        },
      });

    res.json(usuario);
  } catch (error) {
    next(error);
  }
};

const deleteUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;

    const usuario =
      await prisma.usuario.update({
        where: {
          id: Number(id),
        },
        data: {
          activo: false,
        },
      });

    res.json({
      message:
        "Usuario dado de baja",
      usuario,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};