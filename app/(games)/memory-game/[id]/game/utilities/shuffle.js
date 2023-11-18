const shuffle = () => {
    const assets = [
        { image: '../../assets/css.png' },
        { image: '../../assets/dart.png' },
        { image: '../../assets/go.png'},
        { image: '../../assets/js.png' },
        { image: '../../assets/rust.png' },
        { image: '../../assets/react.png' },
        { image: '../../assets/sql.png'},
        { image: '../../assets/node.png' },
    ];
    return [...assets, ...assets]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({ ...card, id: Math.random(), matched: false }));
    };
  
  export default shuffle;