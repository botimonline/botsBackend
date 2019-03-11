import { getConnection } from '../core';
import { Reporter } from '../models';

export const checkReporterKey = async (reporterKey: string): Promise<boolean> => {
  /** Get the record that reporterKey match *reporterKey* parameter. */
  const reporterRepository = getConnection().getRepository(Reporter);
  const reporter = await reporterRepository.findOne({ reporterKey });

  /** If there is a least one match, it means the API key is valid. */
  return !!reporter;
};
