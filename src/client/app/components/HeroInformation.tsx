import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { IGetHeroInformationQuery } from '../../_types/graphql';
import { GetHeroInformation } from '*/graphql_operations/hero.graphql';

interface IProps {
  readonly information: IGetHeroInformationQuery['heroInformation'];
}

const HeroInformation: React.FC<IProps> = (props) => {
  const {
    information,
  } = props;

  return (
    <div>
      <div>
        <label htmlFor="health">Health: </label>
        <span id="heath">{information.health}</span>
      </div>

      <div>
        <label htmlFor="village">Village: </label>
        {information.village
          ? <Link to={`/villages/${information.village.id}`}>{information.village.name}</Link>
          : <span>Unknown</span>
        }
      </div>
    </div>
  );
};

const Container: React.FC = () => {
  const { data, loading } = useQuery<IGetHeroInformationQuery>(GetHeroInformation, {
    fetchPolicy: 'network-only',
  });

  if (loading || !data) {
    return null;
  }

  const {
    heroInformation,
  } = data;

  return <HeroInformation information={heroInformation} />;
};

export { Container as HeroInformation };
