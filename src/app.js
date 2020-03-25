const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const models = require('../db/models')

// 处理json、ulrencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * 查询任务列表
 */
app.get('/list/:status/:page', async (req, res, next) => {
    // next(new Error('自定义异常'));
    // 1. 状态   -1 表示删除 0表示代办 1表示完成 以及全部2
    // 2.分页
    try {
        let { status, page } = req.params;
        let limit = 10;
        let offset = (page - 1) * limit;
        let where = /[01]{1}|-1/.test(status) ? { status } : {};

        let list = await models.Todo.findAndCountAll({
            where, offset, limit
        });

        res.json({ list });
    } catch (error) {
        next(error);
    }

});

// 新增
app.post('/create', async (req, res, next) => {
    try {
        let { name, deadline, content } = req.body;
        // console.log(req.body);
        let todo = await models.Todo.create({ name, deadline, content });
        res.json({ todo });
    } catch (error) {
        next(error);
    }
});

// 编辑
app.post('/update', async (req, res, next) => {
    try {
        let { name, deadline, content, id } = req.body;
        let todo = await models.Todo.findOne({
            where: { id },
        });
        if (todo) {
            todo = await models.Todo.update({
                name,
                deadline,
                content
            }, {
                where: { id }
            })
        }
        console.log(todo);
        res.json({ todo });
    } catch (error) {
        next(error);
    }
});

// 修改状态 、删除
app.post('/update_status', async (req, res, next) => {
    try {
        let { id, status } = req.body;
        switch (parseInt(status)) {
            case -1:
                status = models.Todo.rawAttributes.status.values[0];
                break;
            case 0:
                status = models.Todo.rawAttributes.status.values[1];
                break;
            case 1:
                status = models.Todo.rawAttributes.status.values[2];
                break;
            default:
                next(new Error('非法参数'));
        }

        let todo = await models.Todo.update({ status }, { where: { id } })
        res.json({ todo });
    } catch (error) {
        next(error);
    }

});

// 错误处理
app.use((err, req, res, next) => {
    console.log(err);
    if (err) {
        res.status(500).json({
            message: err.message,
        });
    }
});


app.listen(3000, () => {
    console.log('服务启动成功！');
});