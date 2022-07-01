import styles from './TaskList.module.css';

import plusImg from '../assets/plus.svg';
import checkImg from '../assets/checkImg.svg';
import checkedImg from '../assets/checkedImg.svg';
import trashImg from '../assets/trashImg.svg';
import trashIImgHover from '../assets/trashImgHover.svg';
import backgroundImg from '../assets/background.svg';

import { useEffect, useState } from 'react';



interface Task {
  id: number;
  title: string;
  isComplete: boolean;
  isHover: boolean;
}

export function TaskList() {


  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [counter, setCounter] = useState(0);
  const [counterCreatedTasks, setCounterCreatedTasks] = useState(0);


  useEffect(() => {
    let results = tasks.filter(tasksCompleted => tasksCompleted.isComplete === true).length
    setCounter(results)
    let createdTasks = tasks.filter(pendingTasks => pendingTasks).length
    setCounterCreatedTasks(createdTasks)
     // comentários em ordem Decrescente
     tasks.sort((a, b)=> b.id - a.id);
    
  }, [tasks])



  function handleCreateNewTask() {
    //criar nova task, nao permite criar caso o título esteja vazio
    if (newTaskTitle) {
      setTasks(state => [
        ...state,
        {
          id: state.length,
          title: newTaskTitle,
          isComplete: false,
          isHover: false

        }
      ])
      setNewTaskTitle('')
    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const taskCompleted = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete
    } : task);

    setTasks(taskCompleted);
  }

  function handleMouseEnter(id: number) {
    //Altere entre `true` ou `false` o campo `isHover` de uma task com dado ID
    const setIsHover = tasks.map(task => task.id === id ? {
      ...task,
      isHover: !task.isHover
    } : task);
    setTasks(setIsHover)

  }


  function handleRemoveTask(id: Number) {
    //Remova uma task com o dado ID
    const filteredTasksId = tasks.filter(task => task.id !== id);
    setTasks(filteredTasksId);
  }

  return (

    <section className={styles.container}>
      <header>
        <div className={styles.inputForm}>
          <input
            maxLength={56}
            type="text"
            placeholder="Adicione uma nova tarefa"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" onClick={handleCreateNewTask} > Criar
            <img src={plusImg} alt="" />
          </button>
        </div>
      </header >

      <div className={styles.countTasks}>
        <strong className={styles.createdTasks}>Tarefas criadas <span>{counterCreatedTasks}</span></strong>
        <strong className={styles.finishedTasks}>Concluídas <span>{counter} de {counterCreatedTasks}</span></strong>
      </div>

      <main className={styles.containerMain}>

        <div className={(tasks.length === 0) ? styles.background : styles.backgroundNull}>
          <span>
            <img src={backgroundImg} alt="" />
            <strong>
              Você ainda não tem tarefas cadastradas
            </strong>
            <p>
              Crie tarefas e organize seus itens a fazer
            </p>
          </span>
        </div>


        {tasks.map(task => (

          <ul key={task.id} className={styles.containerList} >
            <li>
              <div className={styles.containerLast} >
                <label >
                  <span>
                    <input className={task.isComplete ? styles.inputHover : ''}
                      type="checkbox"
                    />
                    <img onClick={() => handleToggleTaskCompletion(task.id)}
                      src={`${task.isComplete ? checkedImg : checkImg}`}
                    />
                  </span>
                </label>
                <span>
                  <p
                    className={task.isComplete ? styles.completed : ''}>
                    {task.title}
                  </p>
                </span >
                <button onClick={() => handleRemoveTask(task.id)} type="button"
                >
                  <img onMouseEnter={() => handleMouseEnter(task.id)} onMouseLeave={() => handleMouseEnter(task.id)}
                    src={`${task.isHover ? trashIImgHover : trashImg}`}
                    alt="lixeira tasklist"
                  />
                </button>
              </div>

            </li>
          </ul>
        ))}
      </main>
    </section>

  );
}


