export default function errorServer(err, req, res, next) {
    res.status(500);
    res.json({
        status: 500,
        message: 'Ops, something went wrong!',
        err: err.message,
        stack: err?.stack
    });
}