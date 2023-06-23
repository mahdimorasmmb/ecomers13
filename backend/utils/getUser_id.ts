export default function(req:Request) {
   return req.headers.get('user_id')
}