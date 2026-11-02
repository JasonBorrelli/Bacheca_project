export default function errorServer(err, req, res, next) {
    res.status(500);
    res.json({
        status: 500,
        err: err.message,
        message: 'Ops, something went wrong!'
    });
}