import { openDB } from 'idb';

const DB_NAME = 'citizen-connect-db';
const STORE_NAME = 'pending-reports';
const DB_VERSION = 1;

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
    }
  },
});

export async function saveReportOffline(reportData) {
  const db = await dbPromise;
  await db.add(STORE_NAME, reportData);
}

export async function getAllPendingReports() {
  const db = await dbPromise;
  return await db.getAll(STORE_NAME);
}

export async function deletePendingReport(id) {
  const db = await dbPromise;
  await db.delete(STORE_NAME, id);
}