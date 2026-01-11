import React, { useState, useEffect } from 'react';

function InfiniteTextScroll() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200
      ) {
        setLoading(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (loading) {
      fetchText(page)
        .then((newText) => {
          setText((prevText) => prevText + ' ' + newText);
          setPage((prevPage) => prevPage + 1);
        })
        .finally(() => setLoading(false));
    }
  }, [loading, page]);

  const fetchText = async (page) => {
      // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Text from page ${page}`);
      }, 1000);
    });
  };

  return (
    <div style={{ height: '500px', overflowY: 'scroll' }}>
      <p>{text}</p>
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default InfiniteTextScroll;