"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./src/data-source");
const Blog_1 = require("./src/entity/Blog");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const PORT = 3000;
data_source_1.AppDataSource.initialize().then(async (connection) => {
    const app = (0, express_1.default)();
    app.use(body_parser_1.default.json());
    const BlogRepo = connection.getRepository(Blog_1.Blog);
    app.post('/blogs/create', async (req, res) => {
        try {
            const blogData = {
                title: req.body.title,
                content: req.body.content,
                image: req.body.image,
            };
            const blog = await BlogRepo.save(blogData);
            if (blog) {
                res.status(200).json({
                    message: "blog created successfully",
                    blog: blog
                });
            }
        }
        catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    });
    app.get('/blogs', async (req, res) => {
        try {
            const blogs = await BlogRepo.find();
            if (!blogs) {
                res.status(500).json({
                    message: "not data!",
                });
            }
            else {
                res.status(200).json({
                    message: "success",
                    blogs: blogs
                });
            }
        }
        catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    });
    app.put('/blog/update', async (req, res) => {
        try {
            let blogSearch = await BlogRepo.findOneBy({ id: req.body.id });
            if (!blogSearch) {
                res.status(500).json({
                    message: "blog not found",
                });
            }
            const blog = await BlogRepo.update({ id: req.body.id }, req.body);
            res.status(200).json({
                message: "update success",
            });
        }
        catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    });
    app.delete('/blog/delete', async (req, res) => {
        try {
            let blogSearch = await BlogRepo.findOneBy({ id: req.body.id });
            if (!blogSearch) {
                res.status(500).json({
                    message: "blog not found",
                });
            }
            const blog = await BlogRepo.delete({ id: req.body.id });
            res.status(200).json({
                message: "delete success",
            });
        }
        catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    });
    app.listen(PORT, () => {
        console.log("App running with port: " + PORT);
    });
});
//# sourceMappingURL=index.js.map