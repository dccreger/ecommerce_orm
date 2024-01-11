const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const oneTag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!oneTag) {
      res.status(404).json({ message: "No tag found with that id!" });
      return;
    }
    res.status(200).json(oneTag);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/", async (req, res) => {
  const createTag = await Tag.create(req.body);
  return res.json(createTag);
});

router.put("/:id", async (req, res) => {
  const updateTag = await Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  return res.json(updateTag);
});

router.delete("/:id", async (req, res) => {
  const destroyTag = await Tag.destroy({
    where: { id: req.params.id },
  });
  return res.json(destroyTag);
});

module.exports = router;
