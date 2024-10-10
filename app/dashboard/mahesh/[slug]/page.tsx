interface PROPS {
  params: {
    slug: string;
  };
}

const Index = ({ params }: PROPS) => {
  return (
    <div>
      <h1>Event Slug: {params.slug}</h1>
    </div>
  );
};

export default Index;
