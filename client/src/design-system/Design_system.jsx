import Card from "./design-system/modules/Card";
import Category from "./design-system/modules/Category";

function App() {
  return (
    <div className="App padding-16">
      <section className="margin-b-64">
        <h2 className="margin-b-16">Buttons</h2>

      </section>
      <section className="margin-b-64">
        <h2 className="margin-b-16">Cards</h2>
        <div className="flex row nowrap margin-b-16">
          <Card
            className="card-popular margin-r-16"
            height="0"
            teams={{
              red: { name: "Red" },
              blue: { name: "Blue" }
            }}
          />
          <Card
            className="card-popular margin-r-16"
            height="20"
            teams={{
              red: { name: "Red" },
              blue: { name: "Blue" }
            }}
          />
          <Card
            className="card-popular margin-r-16"
            height="40"
            teams={{
              red: { name: "Red" },
              blue: { name: "Blue" }
            }}
          />
          <Card
            className="card-popular margin-r-16"
            height="60"
            teams={{
              red: { name: "Red" },
              blue: { name: "Blue" }
            }}
          />
          <Card
            className="card-popular margin-r-16"
            height="80"
            teams={{
              red: { name: "Red" },
              blue: { name: "Blue" }
            }}
          />
          <Card
            className="card-popular margin-r-16"
            height="100"
            teams={{
              red: { name: "Red" },
              blue: { name: "Blue" }
            }}
          />
        </div>
        <div className="flex row nowrap margin-b-16">
        <Card
            className="card-latest margin-r-16"
            height="0"
            teams={{
              red: { name: "Red" },
              blue: { name: "Blue" }
            }}
          />
          <Card
            className="card-latest margin-r-16"
            height="20"
            teams={{
              red: { name: "Red" },
              blue: { name: "Blue" }
            }}
          />
          <Card
            className="card-latest margin-r-16"
            height="40"
            teams={{
              red: { name: "Red" },
              blue: { name: "Blue" }
            }}
            winner="red"
          />
          <Card
            className="card-latest margin-r-16"
            height="50"
            teams={{
              red: { name: "Red" },
              blue: { name: "Blue" }
            }}
            winner="draw"
          />
          <Card
            className="card-latest margin-r-16"
            height="60"
            teams={{
              red: { name: "Red" },
              blue: { name: "Blue" }
            }}
            winner="blue"
          />
          <Card
            className="card-latest margin-r-16"
            height="80"
            teams={{
              red: { name: "Red" },
              blue: { name: "Blue" }
            }}
          />
          <Card
            className="card-latest margin-r-16"
            height="100"
            teams={{
              red: { name: "Red" },
              blue: { name: "Blue" }
            }}
          />
        </div>
      </section>
      <section>
        <h2 className="margin-b-16">Categories</h2>
        <div className="flex row wrap">
          <Category
            className="margin-r-16 margin-b-16"
            name="Lifestyle"
          />
          <Category
            className="margin-r-16 margin-b-16"
            name="Fashion & Brands"
          />
          <Category
            className="margin-r-16 margin-b-16"
            name="Food"
          />
          <Category
            className="margin-r-16 margin-b-16"
            name="Tech"
          />
          <Category
            className="margin-r-16 margin-b-16"
            name="Animals"
          />
          <Category
            className="margin-r-16 margin-b-16"
            name="Culture"
          />
          <Category
            className="margin-r-16 margin-b-16"
            name="Gaming"
          />
        </div>
      </section>
    </div>
  );
}

export default App;
