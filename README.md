# 升级server.js的过程：
1. 之前的server.js每一个新的访问路径都需要写一个if else语句，如果有多个文件应该如何办呢？
将原来在sever.js中的一大串代码改成下面这个样子：请求路径改成拼接字符串的样式。
```
response.statusCode = 200
response.setHeader('Content-Type', 'text/html;charset=utf-8')
const x = path
response.write(fs.readFileSync(`./public${x}`))
response.end()
 ```
2. 但是有个bug，就是请求的路径不存在，服务器就挂了（node server.js运行报错了）。
通过try catch来将会出错的代码给包裹起来。
```
response.statusCode = 200
response.setHeader('Content-Type', 'text/html;charset=utf-8')
const x = path
let content
try{
  content = fs.readFileSync(`./public${x}`)
} catch(error){
  content = '文件不存在呀朋友'
  response.statusCode = 404
}
response.write(content)
response.end()
```
3. 这里还有个错误，就是请求路径是/，会走catch。
所以通过x=path来修改一下：```const x = path === '/' ? '/index.html' : path```如果当前的请求路径是/那么就自动补成/index.html。
4. 还有一个问题就是```response.setHeader('Content-Type', 'text/html;charset=utf-8')```这里的text/html，需要根据文件类型更改成javascript/html/css
可以根据本地文件类型来确定，也可以根据浏览器请求的路径来确定。
我们先采用后者将其引用
```
const index = filepath.lastIndexOf('.')
const suffix = filepath.substring(index)  //suffix后缀
//哈希  
const fileTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg'
}
response.setHeader('Content-Type', `${fileTypes[suffix] || 'text/html'};charset=utf-8`)
```
5. 最后将js/css引入页面，看是否出现绿色文本，图片和控制台的输出。
# 启动
```
node server.js 8888
```
