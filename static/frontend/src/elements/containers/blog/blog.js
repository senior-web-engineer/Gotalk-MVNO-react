import './blog.scss';
import { blogs } from '../../../data/meta-data';
import NavigationBack from '../../components/ui-component/navigation-back/navigation-back';
import BlogList from './blog-list';
import routes from '../../../navigation/routes';
import React from 'react';
import { Helmet } from 'react-helmet';

const Blog = () => (
  <>
    <Helmet>
      {blogs.map(({ key, value }) => (
        <meta key={key} name={key} content={value} />
      ))}
    </Helmet>

    <section className="blog">
        <NavigationBack to={routes.home} />
        <h1 className="blog__header">Blogs</h1>
        <BlogList />
    </section>
  </>
);

export default Blog;
