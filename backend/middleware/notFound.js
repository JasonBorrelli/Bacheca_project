export default function notFound(err, req, res, next) {
    res.status(400);
    res.json({
        status: 400,
        err: err?.message,
        message: 'Page not found!'
    });
}