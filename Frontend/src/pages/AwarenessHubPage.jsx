// src/pages/AwarenessHubPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../data/mock-articles';

const ArticleCard = ({ article }) => (
  <Link to={`/awareness/${article.id}`} className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${article.category === 'Cyber Crime' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
      {article.category}
    </span>
    <h3 className="text-xl font-bold mt-3 mb-2 text-gray-800">{article.title}</h3>
    <p className="text-gray-600">{article.excerpt}</p>
    <p className="text-blue-600 font-semibold mt-4">Read More &rarr;</p>
  </Link>
);

export default function AwarenessHubPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Awareness Hub</h1>
      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">Stay informed about the latest cyber scams and civic alerts in our community to keep yourself and others safe.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}