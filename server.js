const express=require("express");
const cookieParser=require("cookie-parser");
const app=express();
//中间件的调用,下面这两行代码，实现了给req身上加上了一个body属性

//中间件
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//中间件调用，下面这行代码，实现了给req加上一个cookies的属性，获取cookie数据
app.use(cookieParser());
//中间件使用静态资源托管设置
//中间件默认有一个'/'，不写的时候就是这个

app.use(express.static("public"));
app.get('/',(req,res)=>{
    //req.query
     console.log(req.query);
     //可以使用req.query.name或age

     res.send("hello express");
 
  
});
app.post("/handleLogin",(req,res)=>{
   //只有调用了那两个中间件，req才有数值
    console.log(req.body);
    //req.body默认是不存在的
    res.send("hello req.body");
    //通过模拟请求可以让我们不去创建form表单
})
//cookie相关
app.get("/setCookie",(req,res)=>{
    //设置cookies
    res.cookie('username','zhangsan',{maxAge:1000*60*10});
    res.send("cookie设置成功呢")
})
app.get("/getCookie",(req,res)=>{
    console.log(req.cookies);
    res.send("cookie获取成功")
});
//获取路由的动态参数
//localhost:3000/hello/apple
//localhost:3000/hello/orange
//localhost:3000/hello/banana
app.get("/hello/:id",(req,res)=>{
console.log(req.params);
//{id:apple}id为动态参数
res.send("我来了吗");
});
app.get("/world/:name/:age",(req,res)=>{
    console.log(req.params);
    console.log(req.get("Accept"));
    res.send("hello world");
});
const myhello=(req,res,next)=>{
    req.requestTime=new Date().getTime();
    next();

};
app.use(myhello);
app.get("/test",(req,res)=>{
    console.log(req.requestTime);
    res.send("test");
})
app.listen("3000");
//设置响应头可以使用res.set()来实现跨域