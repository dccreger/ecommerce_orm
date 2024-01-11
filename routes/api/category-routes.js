const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const oneCategory = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!oneCategory) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }
    res.status(200).json(oneCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  const createCategory = await Category.create(req.body);
  return res.json(createCategory);
});

router.put("/:id", async (req, res) => {
  const updateCategory = await Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  return res.json(updateCategory);
});

router.delete("/:id", async (req, res) => {
  const destroyCategory = await Category.destroy({
    where: { id: req.params.id },
  });
  return res.json(destroyCategory);
});

module.exports = router;
