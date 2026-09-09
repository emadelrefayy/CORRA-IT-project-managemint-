import { ReplitConnectors } from '@replit/connectors-sdk';
import type { Asset, Maintenance, Project, Vlan } from '../types';

const connectors = new ReplitConnectors();
async function query<T>(table:string, params='select=*'):Promise<T[]> {
  const path = `/rest/v1/${table}?${params}`;
  const result = await connectors.proxy('supabase', path) as unknown;
  if (result instanceof Response) {
    if (!result.ok) throw new Error(`${table} could not be loaded (${result.status})`);
    return await result.json() as T[];
  }
  if (typeof result === 'string') {
    const response = await fetch(result, { headers:{ Accept:'application/json' }});
    if (!response.ok) throw new Error(`${table} could not be loaded (${response.status})`);
    return await response.json() as T[];
  }
  if (result && typeof result === 'object' && 'json' in result) return await (result as Response).json() as T[];
  throw new Error('Supabase connector did not return a readable response');
}
export const corraService = {
  projects:()=>query<Project>('projects','select=*&order=updated_at.desc'),
  assets:()=>query<Asset>('assets','select=*&order=updated_at.desc'),
  vlans:()=>query<Vlan>('network_vlans','select=*&order=vlan_id.asc'),
  maintenance:()=>query<Maintenance>('maintenance_records','select=*&order=created_at.desc'),
};