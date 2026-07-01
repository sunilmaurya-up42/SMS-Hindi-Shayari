const home = (req, res) => {
  res.send("🏠 Home Page");
};

const language = (req, res) => {
  const { language } = req.params;

  res.send(`Language : ${language}`);
};

const category = (req, res) => {
  const { category } = req.params;

  res.send(`Category : ${category}`);
};

const shayari = (req, res) => {
  const { slug } = req.params;

  res.send(`Shayari : ${slug}`);
};

const search = (req, res) => {
  const keyword = req.query.q || "";

  res.send(`Search : ${keyword}`);
};

module.exports = {
  home,
  language,
  category,
  shayari,
  search
};
