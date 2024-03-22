import dummyResolver from '../resolvers/dummy.resolver';

const { getDummy } = dummyResolver;

export const handlers = [getDummy];
