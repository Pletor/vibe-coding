// Import Express.js framework pro vytvoření HTTP serveru a API endpointů
import express from 'express';
// Import naší hlavní Helmar CEO agent třídy z lokálního souboru
import { HelmarCEO } from './agents/ceo/helmar';
// Import Winston loggingu pro profesionální logování událostí a chyb
import { createLogger, format, transports } from 'winston';
// Import node-cron pro naplánování automatických úloh (cron jobs)
import cron from 'node-cron';
// Import dotenv pro načítání proměnných prostředí z .env souboru
import dotenv from 'dotenv';

// Načti proměnné prostředí z .env souboru do process.env
// Toto nám umožní používat API klíče a konfigurace bez jejich tvrdého kódování
dotenv.config();

// Vytvoř Express aplikaci - to je náš HTTP server
const app = express();
// Nastav port serveru - použij PORT z .env nebo defaultní 3000
// process.env.PORT je standard pro deployment na cloud platformách (Heroku, AWS)
const port = process.env.PORT || 3000;

// Vytvoř Winston logger pro profesionální logování
// Logger je kritický pro monitoring AI systémů v produkci
const logger = createLogger({
  // Nastav úroveň logování - 'info' zachytí info, warn, error
  level: 'info',
  // Kombinuj více formátů logů dohromady
  format: format.combine(
    // Přidej timestamp k každému log záznamu - důležité pro debugging
    format.timestamp(),
    // Zachyť JavaScript chyby včetně stack trace
    format.errors({ stack: true }),
    // Formátuj výstup jako JSON - lepší pro parsing a analýzu
    format.json()
  ),
  // Definuj kam se logy zapisují (transporters)
  transports: [
    // Zapisuj chyby do samostatného souboru - kritické pro monitoring
    new transports.File({ filename: 'logs/orchestrator-error.log', level: 'error' }),
    // Zapisuj všechny logy do hlavního souboru
    new transports.File({ filename: 'logs/orchestrator-combined.log' }),
    // Zobrazuj logy také v konzoli pro development
    new transports.Console({
      format: format.combine(
        // Obarvuj logy v konzoli podle úrovně (error=červená, warn=žlutá)
        format.colorize(),
        // Použij jednoduchý čitelný formát pro konzoli
        format.simple()
      )
    })
  ]
});

// Nastav Express middleware - software komponenty které zpracovávají HTTP požadavky
// express.json() middleware automaticky parsuje JSON data z POST/PUT požadavků
// Bez tohoto bychom nemohli číst JSON data z API volání
app.use(express.json());
// express.urlencoded() middleware parsuje URL-encoded data z formulářů
// extended: true umožňuje parsovat složité objekty a pole
app.use(express.urlencoded({ extended: true }));

// Inicializuj Helmar CEO Agent - naši hlavní AI entitu
// Toto je singleton pattern - jeden globální agent pro celou aplikaci
const helmar = new HelmarCEO();

/**
 * AI Content Factory Orchestrator
 * Hlavní vstupní bod pro autonomní content factory systém
 * 
 * Orchestrátor je design pattern který koordinuje komplexní workflow
 * V našem případě řídí celý životní cyklus AI Content Factory
 */
class ContentFactoryOrchestrator {
  // Privátní instance Helmar CEO agenta - enkapsulace pro bezpečnost
  private helmarAgent: HelmarCEO;
  // Boolean flag pro kontrolu běhu systému - atomic operation
  private isRunning: boolean = false;

  /**
   * Konstruktor orchestrátoru
   * Inicializuje všechny komponenty a nastaví systém
   */
  constructor() {
    // Přiřaď globální Helmar instanci k tomuto orchestrátoru
    this.helmarAgent = helmar;
    // Nastav API routes pro externí komunikaci s orchestrátorem
    this.setupRoutes();
    // Nastav naplánované úlohy pro autonomní provoz
    this.setupScheduledTasks();
  }

  /**
   * Nastaví API routes pro monitoring a kontrolu orchestrátoru
   * Routes jsou HTTP endpoints které umožňují externí komunikaci
   */
  private setupRoutes(): void {
    // Health check endpoint - základní endpoint pro monitoring
    // GET /health - vrátí stav serveru, používají ho load balancery
    app.get('/health', (req, res) => {
      // Pošli JSON odpověď s informacemi o zdraví systému
      res.json({ 
        status: 'healthy',           // Statický status - server běží
        timestamp: new Date(),       // Aktuální čas pro debug
        uptime: process.uptime()     // Kolik sekund server běží
      });
    });

    // Helmar status endpoint - specifický status AI agenta
    // GET /api/helmar/status - vrátí aktuální stav Helmar agenta
    app.get('/api/helmar/status', async (req, res) => {
      try {
        // Zavolej Helmar metodu pro analýzu výkonu
        // await je nutné protože analyzePerformance() vrací Promise
        const performance = await this.helmarAgent.analyzePerformance();
        // Pošli úspěšnou odpověď s performance metrikami
        res.json({
          status: 'active',        // Helmar agent je aktivní
          performance,             // Performance objekt z Helmar agenta
          timestamp: new Date()    // Když byla data získána
        });
      } catch (error) {
        // Zachyť jakékoli chyby a zaloguj je
        logger.error('Error getting Helmar status:', error);
        // Pošli HTTP 500 chybu klientovi
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Trigger morning briefing
    app.post('/api/helmar/briefing', async (req, res) => {
      try {
        const briefing = await this.helmarAgent.morningBriefing();
        res.json({
          success: true,
          briefing,
          timestamp: new Date()
        });
      } catch (error) {
        logger.error('Error triggering morning briefing:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Get evening report
    app.get('/api/helmar/report', async (req, res) => {
      try {
        const report = await this.helmarAgent.eveningReport();
        res.json({
          success: true,
          report,
          timestamp: new Date()
        });
      } catch (error) {
        logger.error('Error getting evening report:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Trigger strategic decisions
    app.post('/api/helmar/strategy', async (req, res) => {
      try {
        const strategy = await this.helmarAgent.makeStrategicDecisions();
        res.json({
          success: true,
          strategy,
          timestamp: new Date()
        });
      } catch (error) {
        logger.error('Error making strategic decisions:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    // Emergency stop
    app.post('/api/system/stop', (req, res) => {
      logger.warn('🚨 Emergency stop triggered');
      this.isRunning = false;
      res.json({ 
        success: true, 
        message: 'System stop initiated',
        timestamp: new Date()
      });
    });
  }

  /**
   * Setup scheduled tasks for autonomous operation
   */
  private setupScheduledTasks(): void {
    // Daily morning briefing at 9:00 AM
    cron.schedule('0 9 * * *', async () => {
      if (this.isRunning) {
        logger.info('🌅 Running scheduled morning briefing');
        try {
          await this.helmarAgent.morningBriefing();
        } catch (error) {
          logger.error('Error in scheduled morning briefing:', error);
        }
      }
    });

    // Evening report at 6:00 PM
    cron.schedule('0 18 * * *', async () => {
      if (this.isRunning) {
        logger.info('🌆 Running scheduled evening report');
        try {
          await this.helmarAgent.eveningReport();
        } catch (error) {
          logger.error('Error in scheduled evening report:', error);
        }
      }
    });

    // Continuous department management every 30 minutes
    cron.schedule('*/30 * * * *', async () => {
      if (this.isRunning) {
        logger.info('👥 Running department management cycle');
        try {
          await this.helmarAgent.manageDepartments();
        } catch (error) {
          logger.error('Error in department management:', error);
        }
      }
    });

    // Strategic decisions every 4 hours
    cron.schedule('0 */4 * * *', async () => {
      if (this.isRunning) {
        logger.info('🎯 Running strategic decision cycle');
        try {
          await this.helmarAgent.makeStrategicDecisions();
        } catch (error) {
          logger.error('Error in strategic decisions:', error);
        }
      }
    });

    logger.info('⏰ Scheduled tasks configured');
  }

  /**
   * Start the orchestrator
   */
  public async start(): Promise<void> {
    try {
      this.isRunning = true;
      
      // Start the web server
      app.listen(port, () => {
        logger.info(`🚀 AI Content Factory Orchestrator running on port ${port}`);
      });

      // Run initial morning briefing
      logger.info('🌅 Running initial morning briefing...');
      await this.helmarAgent.morningBriefing();

      // Start continuous operation
      logger.info('🤖 Helmar CEO Agent is now operational');
      await this.continuousOperation();

    } catch (error) {
      logger.error('❌ Error starting orchestrator:', error);
      process.exit(1);
    }
  }

  /**
   * Continuous operation loop
   */
  private async continuousOperation(): Promise<void> {
    while (this.isRunning) {
      try {
        // Check system health
        await this.healthCheck();
        
        // Wait 5 minutes before next check
        await new Promise(resolve => setTimeout(resolve, 5 * 60 * 1000));
        
      } catch (error) {
        logger.error('Error in continuous operation:', error);
        await new Promise(resolve => setTimeout(resolve, 30 * 1000)); // Wait 30 seconds on error
      }
    }
  }

  /**
   * System health check
   */
  private async healthCheck(): Promise<void> {
    const memoryUsage = process.memoryUsage();
    const uptime = process.uptime();

    // Log basic system metrics
    logger.debug('System health check:', {
      uptime: `${Math.floor(uptime / 60)} minutes`,
      memory: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
      isRunning: this.isRunning
    });

    // Check if memory usage is too high
    if (memoryUsage.heapUsed > 1024 * 1024 * 1024) { // 1GB
      logger.warn('⚠️ High memory usage detected');
    }
  }

  /**
   * Graceful shutdown
   */
  public async shutdown(): Promise<void> {
    logger.info('🛑 Shutting down AI Content Factory Orchestrator...');
    this.isRunning = false;
    
    // Give time for current operations to complete
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    logger.info('✅ Orchestrator shutdown complete');
    process.exit(0);
  }
}

// Create and start the orchestrator
const orchestrator = new ContentFactoryOrchestrator();

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  await orchestrator.shutdown();
});

process.on('SIGINT', async () => {
  await orchestrator.shutdown();
});

// Start the system
orchestrator.start().catch((error) => {
  logger.error('❌ Fatal error starting orchestrator:', error);
  process.exit(1);
});

export default orchestrator;
