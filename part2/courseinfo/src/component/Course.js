const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </>
  );
};

const Header = ({ name }) => <h2>{name}</h2>;

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => {
        return <Part part={part} key={part.id} />;
      })}
      <Total parts={parts} />
    </>
  );
};

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Total = ({ parts }) => {
  const total = parts.reduce((sum, cur) => {
    return (sum += cur.exercises);
  }, 0);

  return <p>total of {total} exercises</p>;
};

export default Course;
