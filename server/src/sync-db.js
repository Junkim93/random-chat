import models from './models';

export default () => {
  const options = {
    force: false
  };
  return models.sequelize.sync(options);
};
