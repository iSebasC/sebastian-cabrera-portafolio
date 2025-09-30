import { createClient } from '@sanity/client';
import { SanityProject, Project } from '../types/sanity';
import { getImageUrl, IMAGE_PRESETS } from '../lib/sanity-image';

// Configuración del cliente de Sanity
const client = createClient({
  projectId: 'kysyrox3',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2025-09-29',
});

/**
 * Función de debug para probar la conexión directa
 */
export async function testConnection(): Promise<any> {
  try {
    console.log('🔍 Testing direct API connection...');
    
    // Query para obtener todos los documentos - usando la misma URL que funciona en Sanity
    const query = '*[]';
    const baseUrl = 'https://kysyrox3.api.sanity.io/v2025-09-29/data/query/production';
    const url = `${baseUrl}?query=${encodeURIComponent(query)}&perspective=drafts`;
    
    console.log('📊 Query original:', query);
    console.log('📊 URL final:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Connection successful! Response:', data);
    console.log('📊 Found documents:', data.result?.length || 0);
    
    return data.result || [];
  } catch (error: any) {
    console.error('❌ Direct connection failed:', error);
    throw error;
  }
}

/**
 * Obtiene todos los proyectos disponibles usando fetch directo
 */
export async function getAllProjects(): Promise<Project[]> {
  try {
    // Query exacta sin codificar - usando la misma versión de API que funciona en Sanity
    const query = '*[_type == "project"]';
    const baseUrl = 'https://kysyrox3.api.sanity.io/v2025-09-29/data/query/production';
    const url = `${baseUrl}?query=${encodeURIComponent(query)}&perspective=drafts`;
    
    console.log('🔍 Query original:', query);
    console.log('🔍 URL final:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    const sanityProjects: SanityProject[] = data.result || [];
    
    console.log('📊 Found projects:', sanityProjects.length);
    return sanityProjects.map((project, index) => mapSanityProjectToProject(project, index));
  } catch (error) {
    console.error('Error fetching projects from Sanity:', error);
    throw new Error('Failed to fetch projects');
  }
}

/**
 * Obtiene las categorías disponibles
 */
export async function getProjectCategories(): Promise<string[]> {
  try {
    const allProjects = await getAllProjects();
    const categories = [...new Set(allProjects.map(p => p.category))].filter(Boolean);
    return categories;
  } catch (error) {
    console.error('Error fetching project categories:', error);
    throw new Error('Failed to fetch project categories');
  }
}

/**
 * Obtiene un proyecto específico por su ID
 */
export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const allProjects = await getAllProjects();
    const project = allProjects.find(p => p.id === id);
    return project || null;
  } catch (error) {
    console.error('Error fetching project by ID:', error);
    throw new Error('Failed to fetch project');
  }
}

/**
 * Mapea las categorías de Sanity a categorías más específicas para desarrollo
 */
function mapSanityCategory(sanityCategory: string): string {
  const categoryMap: { [key: string]: string } = {
    'ui-ux-design': 'UI UX',
    'ui-ux': 'UI UX',  // Agregado para tu caso específico
    'ux-ui': 'UI UX',  // Variante alternativa
    'web-development': 'Frontend', // Por defecto Frontend, puedes cambiarlo en Sanity por proyecto
    'frontend': 'Frontend',
    'backend': 'Backend', 
    'fullstack': 'FullStack',
    'full-stack': 'FullStack',
    'app': 'App',
    'mobile': 'App',
    'mobile-app': 'App',
    'react': 'Frontend',
    'node': 'Backend',
    'nodejs': 'Backend'
  };

  // Normalizar la categoría (minúsculas, sin espacios extra)
  const normalizedCategory = sanityCategory?.toLowerCase().trim();
  return categoryMap[normalizedCategory] || 'Frontend'; // Default fallback a Frontend
}

/**
 * Función para mapear un proyecto de Sanity a nuestro tipo Project
 */
function mapSanityProjectToProject(sanityProject: SanityProject, index: number = 0): Project {
  // Asignar layout basado en el patrón del diseño original si no viene de Sanity
  const getLayoutByIndex = (idx: number): 'wide' | 'tall' | 'square' => {
    // Patrón más variado: wide-square-tall-square-wide-tall...
    const patterns = ['wide', 'square', 'tall', 'square', 'wide', 'tall'];
    return patterns[idx % patterns.length] as 'wide' | 'tall' | 'square';
  };

  return {
    id: sanityProject._id,
    title: sanityProject.title || 'Proyecto Sin Título',
    category: mapSanityCategory(sanityProject.category || 'ui-ux-design'),
    year: sanityProject.year || new Date().getFullYear().toString(),
    client: sanityProject.client || 'Cliente Confidencial',
    description: sanityProject.description || 'Descripción no disponible',
    challenge: sanityProject.challenge || 'Desafío por definir',
    solution: sanityProject.solution || 'Solución por definir',
    image: sanityProject.mainImage ? getImageUrl(sanityProject.mainImage, IMAGE_PRESETS.hero) : '/placeholder-project.jpg',
    gallery: sanityProject.gallery?.map(img => getImageUrl(img, IMAGE_PRESETS.gallery)) || [],
    services: sanityProject.services || ['Desarrollo Web'],
    tools: sanityProject.tools || ['React', 'TypeScript'],
    results: sanityProject.results || ['Proyecto completado exitosamente'],
    process: sanityProject.process?.map((step, index) => ({
      title: step.title || `Paso ${index + 1}`,
      description: step.description || 'Descripción del proceso'
    })) || [
      { title: 'Análisis', description: 'Análisis inicial del proyecto' },
      { title: 'Diseño', description: 'Diseño de la solución' },
      { title: 'Desarrollo', description: 'Implementación de la solución' }
    ],
    // Usar layout de Sanity o asignar por patrón
    layout: (sanityProject.layout as 'wide' | 'tall' | 'square') || getLayoutByIndex(index),
    tags: sanityProject.tags || [],
    duration: sanityProject.duration || '3 meses',
    team: sanityProject.team || ['Desarrollador Frontend'],
    status: sanityProject.status || 'completed',
    visibility: sanityProject.visibility || 'public',
    featured: sanityProject.featured || false,
    liveUrl: sanityProject.liveUrl || '',
    githubUrl: sanityProject.githubUrl || '',
    behanceUrl: sanityProject.behanceUrl || '',
    figmaUrl: sanityProject.figmaUrl || ''
  };
}

// Exportar cliente por si se necesita acceso directo
export { client };