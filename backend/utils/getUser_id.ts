// eslint-disable-next-line import/no-anonymous-default-export
export default function(req:Request) {
   return req.headers.get('user_id')
}