import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"


//can use database for menus
const menus = [
  {
    "id":0,
    "title": "Caesar Salad",
    "description":"Fresh Romaine, Parmesan cheese, and croutons served with house made creamy Caesar dressing.",
    "price": 15.00,
  },
  {
    "id":1,
    "title": "Crispy Chicken Sandwich",
    "description":"A crispy chicken fillet topped with crisp chopped lettuce, thick-cut tomato and mayo served on a warm toasted bun",
    "price": 17.00,
  },
  {
    "id":2,
    "title": "NY Strip Steak",
    "description":"A New York Strip is firm and tender when it comes to texture, flavor and fat. Cut from the shorter side of the beef loin, the muscles in this area do little work, and that spells tenderness every time.",
    "price": 42.00,
  },
]
const MenuCard=({})=>{
  return (
    <div className="grid md:grid-cols-3 gap-5 p-5">
      {menus.map((menu) => (
        <Card key={menu.id} className=" hover:bg-slate-50">
          <CardHeader>
            <CardTitle>{menu.title}</CardTitle>
            <CardDescription className="md:h-48">{menu.description}</CardDescription>
          </CardHeader>

          <CardFooter>
            ${menu.price}.00
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default MenuCard;
