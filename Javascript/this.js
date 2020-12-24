var name = "kim";
// 그냥 this를 하면 window로 간대
//
const obj1 = {
  name: "seo",
  a: console.log(this),
};

obj1.a;
