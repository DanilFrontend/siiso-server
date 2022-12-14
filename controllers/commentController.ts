import { ApiErrors } from "../error/ApiError";

const { Comments, User } = require("../models/models");
class CommentController {
  async create(req: any, res: any, next: any) {
    try {
      const { newsId } = req.params;
      const { comment, userId } = req.body;
      const comments = await Comments.create({
        comment,
        userId,
        newsId,
      });
      return res.json(comments);
    } catch (e) {
      next(ApiErrors);
    }
  }
  async getAll(req: any, res: any) {
    const { id } = req.params;
    let comment;
    comment = await Comments.findAll({
      where: { newsId: id },
      include: [
        {
          model: User,
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    return res.json(comment);
  }
  async getOne(req: any, res: any) {
    const { id } = req.params;
    let comment;
    comment = await Comments.findOne({
      where: { id },
      include: [
        {
          model: User,
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    return res.json(comment);
  }
  async delete(req: any, res: any, next: any) {
    const { id } = req.params;
    try {
      const comments = await Comments.destroy({
        where: {
          newsId: id,
        },
      });
      return res.json("Комментарий успешно удален");
    } catch (e) {
      next(ApiErrors);
    }
  }
}
module.exports = new CommentController();
