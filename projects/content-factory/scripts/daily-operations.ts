/**
 * Daily Operations Script
 * Automatizovaný script pro denní operace AI Content Factory
 * 
 * Tento script demonstruje jak:
 * - Volat API endpointy programaticky
 * - Automatizovat rutinní úlohy
 * - Integrovat s externími systémy
 * - Monitorovat stav systému
 */

// Import axios pro HTTP požadavky - alternativa k fetch API
import axios from 'axios';
// Import pro práci s časy a daty
import { setTimeout } from 'timers/promises';

// Konfigurace API - v produkci by bylo v .env souboru
const API_BASE_URL = 'http://localhost:3001';
// Timeout pro HTTP požadavky v milisekundách
const REQUEST_TIMEOUT = 10000;

// Axios instance s předkonfigurovaným základním URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  // Přidej JSON headers pro všechny požadavky
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

/**
 * Ověří zda server běží a odpovídá
 * Health check je základní pattern pro microservices
 */
async function checkSystemHealth(): Promise<boolean> {
  try {
    console.log('🔍 Checking system health...');
    
    // Pošli GET požadavek na health endpoint
    const response = await apiClient.get('/health');
    
    // Zkontroluj HTTP status kód (200 = OK)
    if (response.status === 200) {
      console.log('✅ System is healthy:', response.data);
      return true;
    } else {
      console.log('⚠️ System health check failed:', response.status);
      return false;
    }
  } catch (error) {
    // Axios chyby obsahují detailní informace o problému
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Health check error:', errorMessage);
    return false;
  }
}

/**
 * Získá aktuální stav Helmar CEO agenta
 * Důležité pro monitoring AI agent výkonu
 */
async function getHelmarStatus() {
  try {
    console.log('📊 Getting Helmar agent status...');
    
    // API volání pro stav Helmar agenta
    const response = await apiClient.get('/api/helmar/status');
    
    if (response.status === 200) {
      // Dekonstrukce response dat pro lepší čitelnost
      const { status, performance, timestamp } = response.data;
      
      console.log('🤖 Helmar Status:', {
        status,                    // active/inactive
        tasksCompleted: performance.tasksCompleted,
        successRate: performance.successRate,
        systemUptime: performance.systemUptime,
        lastChecked: timestamp
      });
      
      return response.data;
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Error getting Helmar status:', errorMessage);
    throw error;
  }
}

/**
 * Spustí ranní briefing přes API
 * Demonstruje jak vzdáleně ovládat AI agenta
 */
async function triggerMorningBriefing() {
  try {
    console.log('🌅 Triggering morning briefing...');
    
    // POST požadavek pro spuštění briefingu
    const response = await apiClient.post('/api/helmar/briefing');
    
    if (response.status === 200) {
      const { briefing } = response.data;
      
      console.log('📋 Morning briefing completed:');
      console.log('  📅 Date:', briefing.date);
      console.log('  🎯 Content themes:', briefing.contentThemes.join(', '));
      console.log('  💰 Total budget:', briefing.budgetAllocation.total);
      console.log('  📝 Tasks assigned:', briefing.departmentTasks.length);
      console.log('  📊 KPIs tracked:', briefing.kpis.length);
      
      return briefing;
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Error triggering morning briefing:', errorMessage);
    throw error;
  }
}

/**
 * Získá večerní report přes API
 * Ukáže výsledky dne a metriky výkonu
 */
async function getEveningReport() {
  try {
    console.log('🌆 Getting evening report...');
    
    // GET požadavek pro večerní report
    const response = await apiClient.get('/api/helmar/report');
    
    if (response.status === 200) {
      const { report } = response.data;
      
      console.log('📈 Evening report summary:');
      console.log('  ✅ Tasks completed:', `${report.performance.tasksCompleted}/${report.performance.tasksTotal}`);
      console.log('  💵 Daily revenue:', `$${report.revenue.dailyRevenue}`);
      console.log('  📱 Posts created:', report.content.postsCreated);
      console.log('  🎥 Videos produced:', report.content.videosProduced);
      console.log('  📊 Engagement rate:', `${(report.content.engagementRate * 100).toFixed(1)}%`);
      console.log('  🚨 Issues:', report.issues.length);
      
      return report;
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Error getting evening report:', errorMessage);
    throw error;
  }
}

/**
 * Spustí strategické rozhodování
 * AI agent vytvoří novou strategii na základě dat
 */
async function triggerStrategicDecisions() {
  try {
    console.log('🎯 Triggering strategic decisions...');
    
    // POST požadavek pro strategické rozhodování
    const response = await apiClient.post('/api/helmar/strategy');
    
    if (response.status === 200) {
      const { strategy } = response.data;
      
      console.log('📊 Strategic decisions completed:');
      console.log('  🏷️ Strategy name:', strategy.name);
      console.log('  ⏱️ Timeline:', strategy.timeline);
      console.log('  💰 Budget:', `$${strategy.budget}`);
      console.log('  📈 Expected ROI:', `${strategy.expectedROI}x`);
      console.log('  🎯 Objectives:', strategy.objectives.length);
      
      return strategy;
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Error triggering strategic decisions:', errorMessage);
    throw error;
  }
}

/**
 * Kompletní denní cyklus operací
 * Simuluje celý den AI Content Factory provozu
 */
async function runDailyOperations() {
  console.log('🚀 Starting daily operations cycle...\n');
  
  try {
    // 1. Ověř zdraví systému
    const isHealthy = await checkSystemHealth();
    if (!isHealthy) {
      throw new Error('System health check failed');
    }
    
    // Krátká pauza mezi operacemi pro realistické tempo
    await setTimeout(1000);
    
    // 2. Zkontroluj stav Helmar agenta
    await getHelmarStatus();
    await setTimeout(1000);
    
    // 3. Spusť ranní briefing
    await triggerMorningBriefing();
    await setTimeout(2000);
    
    // 4. Spusť strategické rozhodování
    await triggerStrategicDecisions();
    await setTimeout(2000);
    
    // 5. Získej večerní report
    await getEveningReport();
    
    console.log('\n🎉 Daily operations cycle completed successfully!');
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('\n❌ Daily operations failed:', errorMessage);
    process.exit(1);
  }
}

/**
 * Monitoring loop pro kontinuální sledování systému
 * V produkci by běžel jako samostatný service
 */
async function startMonitoring() {
  console.log('📡 Starting system monitoring...');
  
  // Nekonečná smyčka pro monitoring
  while (true) {
    try {
      // Zkontroluj zdraví každých 30 sekund
      await checkSystemHealth();
      await getHelmarStatus();
      
      // Čekej 30 sekund před dalším checkem
      console.log('⏱️ Waiting 30 seconds before next check...\n');
      await setTimeout(30000);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('⚠️ Monitoring error:', errorMessage);
      // Pokračuj v monitoringu i při chybách
      await setTimeout(5000);
    }
  }
}

// Kontrola argumentů z command line
const args = process.argv.slice(2);

// Main execution logic
if (require.main === module) {
  // Pokud je script spuštěn s argumentem "monitor"
  if (args.includes('--monitor')) {
    startMonitoring().catch(console.error);
  } else {
    // Jinak spusť standardní denní operace
    runDailyOperations().catch(console.error);
  }
}

// Export funkcí pro použití v jiných souborech
export {
  checkSystemHealth,
  getHelmarStatus,
  triggerMorningBriefing,
  getEveningReport,
  triggerStrategicDecisions,
  runDailyOperations,
  startMonitoring
};
