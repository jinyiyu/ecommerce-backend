const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags - include its associated Product data
  try {
    const tags = await Tag.findAll({ include: { model: Product } });
    if (!tags.length) {
      res.status(404).json({ success: false, message: "There are no tags..." });
    }
    res.json(tags);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const { id } = req.params;
    const tag = await Tag.findByPk(id, { include: { model: Product } });
    if (!tag) {
      res.status(404).json({
        success: false,
        message: `Tag id number ${id} does not exist`,
      });
    }
    res.json(tag);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/", async (req, res) => {
  // create a new tag

  try {
    const { tag_name } = req.body;

    if (!tag_name) {
      res.status(400).json({
        success: false,
        message: "Unable to create tag",
      });
      const newTag = await Tag.create(req.body);
      return res.json(newTag);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
