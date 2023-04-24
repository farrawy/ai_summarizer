import { useState, useEffect } from 'react';

import { bin, copy, linkIcon, loader, tick } from '../assets';

import { useLazyGetSummaryQuery } from '../services/article';

const Demo = () => {
  const [article, setArticle] = useState({
    url: '',
    summary: '',
  });

  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState('');

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem('articles'),
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  // Submit URL
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };

      const updatedAllArticles = [newArticle, ...allArticles];
      setArticle(newArticle);
      setAllArticles(updatedAllArticles);

      localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
    }
  };

  // Delete Article
  const handleDelete = (deleteUrl) => {
    const filteredArticles = allArticles.filter(
      (article) => article.url !== deleteUrl,
    );
    setAllArticles(filteredArticles);
    localStorage.setItem('articles', JSON.stringify(filteredArticles));
  };

  // Copy URL
  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      {/* Search */}
      <div className="flex flex-col w-full gap-2">
        <form
          action=""
          className="relative flex justify-center items-center "
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />

          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="url_input peer"
            onInvalid={(e) => {
              e.target.setCustomValidity(
                'Please enter a valid URL: https://example.com',
              );
            }}
          />

          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700 "
          >
            ↵
          </button>
        </form>

        {/* Browse URL History */}
        <div className="flex flex-col w-full gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
              key={index}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div
                type="button"
                onClick={() => handleCopy(item.url)}
                className="copy_btn"
              >
                <img
                  src={copied === item.url ? tick : copy}
                  alt="copy icon"
                  className="w-[50%] h-[50%] object-contain"
                />
              </div>

              <p
                title={item.url}
                className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate"
              >
                {item.url}
              </p>

              <div
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(item.url);
                }}
                className="delete_btn "
              >
                <img
                  src={bin}
                  alt="copy icon"
                  className="w-[60%] h-[60%] object-contain peer-focus:opacity-100"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Display Results */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <div className="flex flex-col justify-center items-center w-full">
            <img src={loader} alt="loader" className="w-20 h-20" />
            <p>This may take 5 to 10 seconds</p>
          </div>
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Well, that wasn&apos;t supposed to happen
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>

              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
