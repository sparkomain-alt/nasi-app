import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  GeoPoint,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from './config';
import type { CommunityReport, ReportType, FleetVehicle } from '@nasi/types';

// ─── Reports ──────────────────────────────────────────────────────────────────
export async function addReport(
  type: ReportType,
  lat: number,
  lng: number,
  userId: string,
  description?: string
) {
  return addDoc(collection(db, 'reports'), {
    type,
    location: new GeoPoint(lat, lng),
    userId,
    upvotes: 0,
    downvotes: 0,
    description: description ?? null,
    createdAt: serverTimestamp(),
    expiresAt: Timestamp.fromMillis(Date.now() + 2 * 60 * 60 * 1000), // 2 hrs
  });
}

export function subscribeToNearbyReports(
  callback: (reports: CommunityReport[]) => void
) {
  const q = query(
    collection(db, 'reports'),
    where('expiresAt', '>', Timestamp.now()),
    orderBy('expiresAt'),
    limit(50)
  );
  return onSnapshot(q, (snap) => {
    const reports = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as CommunityReport[];
    callback(reports);
  });
}

// ─── Fleet ────────────────────────────────────────────────────────────────────
export function subscribeToFleet(
  companyId: string,
  callback: (vehicles: FleetVehicle[]) => void
) {
  const q = query(collection(db, 'fleet_vehicles'), where('companyId', '==', companyId));
  return onSnapshot(q, (snap) => {
    const vehicles = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as FleetVehicle[];
    callback(vehicles);
  });
}

export async function updateVehicleLocation(
  vehicleId: string,
  lat: number,
  lng: number,
  heading: number,
  speed: number
) {
  await updateDoc(doc(db, 'fleet_vehicles', vehicleId), {
    location: new GeoPoint(lat, lng),
    heading,
    speed,
    lastSeen: serverTimestamp(),
  });
}
